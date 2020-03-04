import React from 'react'
import {connect} from 'react-redux'

class ButtonAddToCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    // fruit should associate with order(cart)
    // Order.addFruit(fruit)
    // Fruit.addOrder(order)
    // event.target.value

    //dispatch
    //return
    // if user is logged in, add to
    // if not logged in add to local storage
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="QTY">Quantity: </label>
          <input id="inputQTY" type="text" name="QTY" required="required" />
          <button type="submit">Add To Cart</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedFruit: state.fruit.selectedFruit
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // work in progress
  }
}

export default connect(mapStateToProps)(ButtonAddToCart)
