import React from 'react'
import {connect} from 'react-redux'
import {getUpdateCart, updateGuestCart} from '../store/cart'

const defaultState = {
  QTY: 1
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
    // Check is the user is a logged in user
    if (!this.props.user.id) {
      // get the cart from the localStorage
      // let cart = window.localStorage.getItem('cart')
      // if there is a cart.
      // if (cart) {
      //   // Add item to cart.
      //     if(cart[this.props.selectedFruit.id]){
      //       cart[this.props.selectedFruit.id] += Number(this.state.QTY)
      //     } else {
      //       window.localStorage.setItem
      //     }
      //   }
      //   // if there is no cart.
      //   // initialize cart.
      // }
    }

    // setting up object to be passed to dispatch
    const fruitData = {
      fruitId: this.props.selectedFruit.id,
      quantity: this.state.QTY
    }
    // For a logged in user: dispatch update cart to talk with database
    if (this.props.isLoggedIn) {
      this.props.updateCart(fruitData)
    } else {
      // For a guest user: update the redux store with cart item
      this.props.updateGuestCart({
        quantity: fruitData.quantity,
        selectedFruit: this.props.selectedFruit
      })
      // console.log('buttonComp: ',JSON.parse(window.localStorage.getItem('guestCart')))
    }
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
            type="number"
            onChange={this.handleChange}
            id="inputQTY"
            value={this.state.QTY}
            min="1"
          />
          <button type="submit">Add To Cart</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedFruit: state.fruit.selectedFruit,
    isLoggedIn: !!state.user.selectedUser.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCart: data => dispatch(getUpdateCart(data)),
    updateGuestCart: data => dispatch(updateGuestCart(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAddToCart)
