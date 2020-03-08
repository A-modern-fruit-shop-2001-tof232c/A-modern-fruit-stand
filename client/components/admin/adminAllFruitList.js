import React from 'react'
import {connect} from 'react-redux'
import {
  addFruitThunk,
  removeFruitThunk,
  updateFruitThunk
} from '../../store/fruit'

class AdminAllFruit extends React.Component {
  constructor() {
    super()
    this.state = {
      fruitSearch: '',
      // selectedFruit: '',
      currFruitName: '',
      currFruitOrigin: ''
      // currFruitPrice: '',
      // currFruitDescription: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    console.log(event.target.value, event.target.dataset.div_id)
    this.setState({[event.target.name]: event.target.value})
    this.setState({selectedFruitId: event.target.dataset.div_id})
  }

  handleSubmit(event) {
    event.preventDefault()
    let updatedFruit = {
      name: this.state.currFruitName,
      origin: this.state.currFruitOrigin
    }
    //console.log(updatedFruit)
    this.props.updateFruitThunk(this.state.selectedFruitId, updatedFruit)
    this.setState({currFruitName: '', currFruitOrigin: ''})
  }

  render() {
    return (
      <div className="fruitFormTable">
        <form>
          <label>
            Search
            <input
              type="text"
              value={this.state.fruitSearch}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Search for Fruit!" />
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  allFruit: state.fruit.allFruit
})

const mapDispatch = dispatch => ({
  addFruitThunk: newFruit => dispatch(addFruitThunk(newFruit)),
  removeFruitThunk: id => dispatch(removeFruitThunk(id)),
  updateFruitThunk: (id, updatedFruit) =>
    dispatch(updateFruitThunk(id, updatedFruit))
})

//export const AdminAllFruit = connect(mapState, mapDispatch)(DisconnectedAllFruitAdmin)
//the bare component is exported for testing
export {AdminAllFruit}
//the connected component is exported for actual deployment
export default connect(mapState, mapDispatch)(AdminAllFruit)
