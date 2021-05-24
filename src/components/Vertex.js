import { Handle } from 'react-flow-renderer'

const vertexStyle = {
  background: 'black',
  color: 'white',
  padding: 10,
  borderRadius: '50%'
}

const handleStyle = {
  borderRadius: 10,
  transform: 'translate(0px, 25px)',
  visibility: 'hidden'
}

const Vertex = ({ data }) => {
  return (
    <div style={vertexStyle}>
      <Handle
        type='source'
        position='top'
        style={handleStyle}
      />
      <div>{data.text}</div>
      <Handle
        type='target'
        position='top'
        style={handleStyle}
      />
    </div>
  )
}

export default Vertex
