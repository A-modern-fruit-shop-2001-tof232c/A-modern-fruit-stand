import React from 'react'
import {connect} from 'react-redux'
import {getUpdateCart} from '../store/cart'

const defaultState = {
  QTY: 0
}

class ButtonAddToCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    // setting up object to be passed to dispatch
    const fruitData = {
      fruitId: this.props.selectedFruit.id,
      quantity: this.state.QTY
    }
    // dispatch
    this.props.updateCart(fruitData)
    this.setState(defaultState)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="QTY">Quantity: </label>
          <input
            name="QTY"
            type="text"
            onChange={this.handleChange}
            id="inputQTY"
            required="required"
          />
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
    updateCart: data => dispatch(getUpdateCart(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAddToCart)
