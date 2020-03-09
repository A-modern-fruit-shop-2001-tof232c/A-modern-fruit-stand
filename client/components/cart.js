import React from 'react'
import {connect} from 'react-redux'
import {getCart, getGuestCart} from '../store/cart'
import {ButtonCheckout} from '../components'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getCart()
    this.props.getGuestCart()
  }

  render() {
    let cart = this.props.cart
    if (cart.fruits) {
      return (
        <div id="cart">
          <div>
            <h2>Fruit Basket</h2>
          </div>
          <div>
            {/* Map over all fruit in the cart*/}
            {cart.fruits.map(fruit => {
              return (
                <div key={fruit.id}>
                  <div>{fruit.name}</div>
                  <img src={fruit.imgURL} />
                  <div>QTY: {fruit.orderFruit.quantity}</div>
                  <div>Price: {fruit.orderFruit.itemTotal}</div>
                </div>
              )
            })}
          </div>
          <div>
            <h3>Subtotal: {cart.orderTotal}</h3>
          </div>
          <ButtonCheckout cartId={cart.id} />
        </div>
      )
    } else {
      return <div>Your fruit basket is empty!</div>
    }
  }
}

const mapStateToProps = state => ({
  // user: state.user,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  getGuestCart: () => dispatch(getGuestCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
