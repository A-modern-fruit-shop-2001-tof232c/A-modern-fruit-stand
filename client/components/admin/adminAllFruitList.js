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
      currFruitName: '',
      currFruitOrigin: '',
      currFruitPrice: '',
      currFruitDescription: '',
      selectedFruitId: -1
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
    const updatedFruit = {
      name: this.state.currFruitName,
      origin: this.state.currFruitOrigin
    }
    console.log(updatedFruit)
    this.props.updateFruitThunk(this.state.selectedFruitId, updatedFruit)
  }

  render() {
    return (
      <div className="fruitFormTable">
        <span className="fruitFormTd">Name</span>
        <span className="fruitFormTd">Origin</span>
        {this.props.allFruit.map(element => {
          return (
            <div key={element.id}>
              <form className="fruitFormTr" onSubmit={this.handleSubmit}>
                <span className="fruitFormTd">
                  <input
                    type="text"
                    data-div_id={element.id}
                    defaultValue={element.name}
                    name="currFruitName"
                    onChange={this.handleChange}
                  />
                </span>
                <span className="fruitFormTd">
                  <input
                    type="text"
                    data-div_id={element.id}
                    name="currFruitOrigin"
                    defaultValue={element.origin}
                    onChange={this.handleChange}
                  />
                </span>
                <span className="fruitFormTd">
                  <input type="submit" />
                </span>
              </form>
            </div>
          )
        })}
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
