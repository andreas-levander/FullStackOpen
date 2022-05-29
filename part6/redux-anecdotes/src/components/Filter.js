import { setFilter } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = ({ setFilter }) => {
    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      const input = event.target.value

      setFilter(input)
    }
    
    const style = {
      marginBottom: 10,
      marginTop: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default connect(null, { setFilter })(Filter)