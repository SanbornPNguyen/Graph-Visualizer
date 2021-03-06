import { useState } from 'react'
import ReactFlow, { addEdge, removeElements, isNode } from 'react-flow-renderer'

import TextareaAutosize from 'react-textarea-autosize'

import Vertex from './components/Vertex'
const nodeTypes = {
  special: Vertex
}

const graphStyle = {
  height: 500,
  width: 500,
  borderStyle: 'solid'
}

let vertexIDCounter = 0
const App = () => {
  const [ notice, setNotice ] = useState('Welcome to Graph Visualizer!')
  const [ elements, setElements ] = useState([])
  const [ selectedEdge, setSelectedEdge ] = useState(null)
  const [ selectedEndpoint, setSelectedEndpoint ] = useState(null)
  const [ exportGraph, setExport ] = useState('')
  const [ importGraph, setImport ] = useState('')

  const addVertex = () => {
    const id = vertexIDCounter.toString()
    const newVertex = {
      id: id,
      data: {
        label: id,
        text: id
      },
      type: 'special',
      position: {
        x: 0,
        y: 0
      }
    }
    setElements(elements.concat(newVertex))
    vertexIDCounter += 1
  }

  const addNewEdge = (event, node) => {
    if (selectedEndpoint === null) {
      setSelectedEndpoint(node)
      setNotice(`Node ${node.id.toString()} is currently selected. Double click on another node to create an edge`)
      return
    } else {
      if (node.id === selectedEndpoint.id) {
        setSelectedEndpoint(null)
        setNotice('Adding edge failed. You can not add loops')
        return
      }
      if (elements.filter((element) => element.source === selectedEndpoint.id && element.target === node.id).length > 0) {
        setSelectedEndpoint(null)
        setNotice('Adding edge failed. You can not have multiple edges between vertices')
        return
      }
      if (elements.filter((element) => element.source === node.id && element.target === selectedEndpoint.id).length > 0) {
        setSelectedEndpoint(null)
        setNotice('Adding edge failed. You can not have multiple edges between vertices')
        return
      }

      const params = {
        source: selectedEndpoint.id,
        target: node.id,
        type: 'straight',
        style: {
          stroke: 'rgb(0, 0, 0)',
          strokeWidth: 3
        }
      }
      setSelectedEndpoint(null)
      setNotice('Edge successfully added!')
      setElements((elements) => addEdge(params, elements))
    }
  }

  const deleteVertex = (event, node) => {
    event.preventDefault()
    setElements((elements) => removeElements([node], elements))
  }

  const deleteEdge = (event) => {
    if (selectedEdge == null) return

    setElements((elements) => removeElements([selectedEdge], elements))
    setSelectedEdge(null)
  }

  const initializeDeleteEdge = (event, edge) => {
    setSelectedEdge(edge)
  }

  const terminateDeleteEdge = (event, edge) => {
    setSelectedEdge(null)
  }

  const clearElements = () => {
    vertexIDCounter = 0
    setElements([])
    setSelectedEdge(null)
    setSelectedEndpoint(null)
  }

  const dragStop = (event, node) => {
    console.log(event, node)
    let element = elements.filter((element) => element.id === node.id)[0]
    element.position = {x: node.position.x, y: node.position.y}
  }

  const submitExport = () => {
    let graphExport = ''
    elements
      .forEach((element) => {
      if (isNode(element)) {
        graphExport = graphExport.concat(`vertex ${element.id} ${element.position.x} ${element.position.y}\n`)
      } else {
        graphExport = graphExport.concat(`edge ${element.source} ${element.target}\n`)
      }
    })
    setExport(graphExport)
    console.log(elements)
  }
  
  const changeImport = (event) => {
    setImport(event.target.value)
  }
  const submitGraph = () => {
    const graphElements = importGraph.split('\n')
    // Verify correct format
    for (let i = 0; i < graphElements.length; i++) {
      const currElement = graphElements[i].split(' ')
      if (currElement[0] === 'vertex') {
        if (currElement.length !== 4) {
          setNotice('Invalid graph import')
          return false
        }
      } else if (currElement[0] === 'edge') {
        if (currElement.length !== 3) {
          setNotice('Invalid graph import')
          return false
        }
      } else {
        setNotice('Invalid graph import')
        return false
      }
    }
    // Check vertex or node
    clearElements()

    let verticesToAdd = []
    let edgesToAdd = []
    for (let i = 0; i < graphElements.length; i++) {
      const currElement = graphElements[i].split(' ')
      // If vertex make new vertex and add
      if (currElement[0] === 'vertex') {
        const newVertex = {
          id: currElement[1],
          data: {
            label: currElement[1],
            text: currElement[1]
          },
          type: 'special',
          position: {
            x: currElement[2],
            y: currElement[3]
          }
        }
        verticesToAdd = verticesToAdd.concat(newVertex)
        vertexIDCounter += 1
      // If edge make new edge and add
      } else if (currElement[0] === 'edge') {
        const params = {
          source: currElement[1],
          target: currElement[2],
          type: 'straight',
          style: {
            stroke: 'rgb(0, 0, 0)',
            strokeWidth: 3
          }
        }
        edgesToAdd = addEdge(params, edgesToAdd)
      }
    }
    setElements(verticesToAdd.concat(edgesToAdd))
  }

  return (
    <div>
      <div>
        <h1>{notice}</h1>
      </div>
      <div>
        <button onClick={addVertex}>
          Add Vertex
        </button>
        <button onClick={clearElements}>
          Clear
        </button>
      </div>
      <div style={graphStyle}>
        <ReactFlow
          elements={elements}
          nodeTypes={nodeTypes}
          onNodeDoubleClick={addNewEdge}
          onNodeContextMenu={deleteVertex}
          onClick={deleteEdge}
          onEdgeMouseEnter={initializeDeleteEdge}
          onEdgeMouseLeave={terminateDeleteEdge}
          onNodeDragStop={dragStop}
        />
      </div>
      <div>
        <h4>{'Export Graph'}</h4>
        <div>
        <TextareaAutosize 
          value={exportGraph}
        />
        <button onClick={submitExport}>export</button>
        </div>
      </div>
      <div>
        <h4>{'Import Graph'}</h4>
        <div>
          <TextareaAutosize
            value={importGraph}
            onChange={changeImport}
          />
          <button onClick={submitGraph}>submit</button>
        </div>
      </div>
    </div>
  )
}

export default App
