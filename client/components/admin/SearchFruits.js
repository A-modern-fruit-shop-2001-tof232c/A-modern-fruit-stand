import React from 'react'
import {connect} from 'react-redux'
import {autofill} from '../../../script/autofill'

class SearchFruit extends React.Component {
  constructor() {
    super()
    this.state = {
      searchInput: '',
      matchingFruits: [],
      chosenFruit: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({searchInput: event.target.value})
    let currInput = this.state.searchInput
    this.setState({matchingFruits: autofill(currInput, this.props.allFruit)})
    //console.log(this.state.matchingFruits)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div className="fruitFormTable">
        <form>
          <label>
            Search
            <input
              type="text"
              value={this.state.searchInput}
              onChange={this.handleChange}
            />
          </label>
          <select value={this.state.selectedFruit}>
            {this.state.matchingFruits.map((element, elemInd) => (
              <option key={elemInd} value={element}>
                {element}
              </option>
            ))}
          </select>
          <input type="submit" value="Search for Fruit!" />
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  allFruit: state.fruit.allFruit
})

const mapDispatch = dispatch => ({})

//export const AdminAllFruit = connect(mapState, mapDispatch)(DisconnectedAllFruitAdmin)
//the bare component is exported for testing
export {SearchFruit}
//the connected component is exported for actual deployment
export default connect(mapState, null)(SearchFruit)
