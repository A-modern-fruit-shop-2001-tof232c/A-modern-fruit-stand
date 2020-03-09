import React from 'react'
import {connect} from 'react-redux'
import {ButtonCheckout} from '../components'
import {getCart, getGuestCart, removeItem, updateQuantity} from '../store/cart'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    // this.state = this.props.cart
    this.componentDidMount = this.componentDidMount.bind(this)
    this.deleteItemHandler = this.deleteItemHandler.bind(this)
    this.incrementQuantityHandler = this.incrementQuantityHandler.bind(this)
    this.decrementQuantityHandler = this.decrementQuantityHandler.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
    this.props.getGuestCart()
  }

  deleteItemHandler(event) {
    event.preventDefault()
    // When click will remove the item from the cart
    const fruitId = event.target.dataset.fruitid
    this.props.removeItem(fruitId)
  }

  incrementQuantityHandler(event) {
    event.preventDefault()
    // When click will increment the quantity of the cart by one
    const fruitId = event.target.dataset.fruitid
    const isIncrement = true
    this.props.updateQuantity(fruitId, isIncrement)
  }

  decrementQuantityHandler(event) {
    event.preventDefault()
    // When click will decrement the quantity of the item by one.
    const fruitId = event.target.dataset.fruitid
    const isIncrement = false
    this.props.updateQuantity(fruitId, isIncrement)
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
                  <Link to={`/fruit/${fruit.id}`}>
                    <h4>{fruit.name}</h4>
                  </Link>
                  <button
                    type="button"
                    onClick={this.deleteItemHandler}
                    data-fruitid={fruit.id}
                  >
                    Remove Item
                  </button>
                  <img
                    src={fruit.imgURL}
                    style={{maxWidth: '100px', maxHeigth: '100px'}}
                  />

                  <div>
                    <button
                      type="button"
                      onClick={this.incrementQuantityHandler}
                      data-fruitid={fruit.id}
                    >
                      +
                    </button>
                    <div>QTY: {fruit.orderFruit.quantity}</div>
                    <button
                      type="button"
                      onClick={this.decrementQuantityHandler}
                      data-fruitid={fruit.id}
                    >
                      -
                    </button>
                  </div>
                  <div>Price Per Item: {fruit.orderFruit.itemPrice} </div>
                  <div>
                    Item Total:{' '}
                    {fruit.orderFruit.quantity * fruit.orderFruit.itemPrice}
                  </div>
                </div>
              )
            })}
          </div>
          <div>
            <h3>Subtotal: {cart.orderTotal}</h3>
          </div>
          <ButtonCheckout cartId={cart.id} />
          <div>
            <Link to="/fruit">
              <button type="button">CONTINUE SHOPPING</button>
            </Link>
          </div>
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
  getGuestCart: () => dispatch(getGuestCart()),
  removeItem: fruitId => dispatch(removeItem(fruitId)),
  updateQuantity: (fruitId, isIncrement) =>
    dispatch(updateQuantity(fruitId, isIncrement))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
