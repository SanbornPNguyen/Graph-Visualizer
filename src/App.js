import { useState } from 'react'
import ReactFlow, { addEdge, removeElements } from 'react-flow-renderer'

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
  const [ elements, setElements ] = useState([])
  const [ selectedEdge, setSelectedEdge ] = useState(null)
  const [ selectedEndpoint, setSelectedEndpoint ] = useState(null)

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
      return
    } else {
      if (node.id === selectedEndpoint.id) {
        setSelectedEndpoint(null)
        return
      }
      if (elements.filter((element) => element.source === selectedEndpoint.id && element.target === node.id).length > 0) {
        setSelectedEndpoint(null)
        return
      }
      if (elements.filter((element) => element.source === node.id && element.target === selectedEndpoint.id).length > 0) {
        setSelectedEndpoint(null)
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

  return (
    <div>
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
        />
      </div>
    </div>
  )
}

export default App
