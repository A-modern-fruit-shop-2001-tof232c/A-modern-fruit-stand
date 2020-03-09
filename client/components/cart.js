import React from 'react'
import {connect} from 'react-redux'
import {
  getCart,
  getGuestCart,
  removeItem,
  removeGuestItem,
  incrOrDecrGuestCart,
  updateQuantity
} from '../store/cart'
import {ButtonCheckout} from '../components'
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
    if (this.props.isLoggedIn) {
      this.props.getCart()
    } else {
      this.props.getGuestCart()
    }
  }

  deleteItemHandler(event) {
    event.preventDefault()
    // When click will remove the item from the cart
    const fruitId = event.target.dataset.fruitid
    if (this.props.isLoggedIn) {
      this.props.removeItem(fruitId)
    } else {
      //for a guest user
      this.props.removeGuestItem(fruitId)
    }
  }

  incrementQuantityHandler(event) {
    event.preventDefault()
    // When click will increment the quantity of the cart by one
    if (this.props.isLoggedIn) {
      const fruitId = event.target.dataset.fruitid
      const isIncrement = true
      this.props.updateQuantity(fruitId, isIncrement)
    } else {
      //for a guest user
      const incrOrDecr = event.target.innerHTML
      const fruit = event.target.dataset.fruit
      this.props.incrOrDecrGuestCart(incrOrDecr, fruit)
    }
  }

  decrementQuantityHandler(event) {
    event.preventDefault()
    // When click will decrement the quantity of the item by one.
    if (this.props.isLoggedIn) {
      const fruitId = event.target.dataset.fruitid
      const isIncrement = false
      this.props.updateQuantity(fruitId, isIncrement)
    } else {
      //for a guest user
      const incrOrDecr = event.target.innerHTML
      const fruit = event.target.dataset.fruit
      this.props.incrOrDecrGuestCart(incrOrDecr, fruit)
    }
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
              console.log(fruit)
              return (
                <div key={fruit.id}>
                  <Link to={`/fruit/${fruit.id}`}>
                    <h4>{fruit.name}</h4>
                  </Link>
                  <button
                    type="button"
                    onClick={this.deleteItemHandler}
                    data-fruitid={fruit.id}
                    type="button"
                  >
                    Remove Item
                  </button>
                  <img
                    src={fruit.imgURL}
                    style={{maxWidth: '100px', maxHeight: '100px'}}
                  />

                  <div>
                    <button
                      onClick={this.incrementQuantityHandler}
                      type="button"
                      data-fruit={fruit}
                      data-fruitid={fruit.id}
                    >
                      +
                    </button>
                    <div>QTY: {fruit.orderFruit.quantity}</div>
                    <button
                      onClick={this.decrementQuantityHandler}
                      type="button"
                      data-fruit={fruit}
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
  cart: state.cart,
  isLoggedIn: !!state.user.selectedUser.id
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  getGuestCart: () => dispatch(getGuestCart()),
  removeItem: fruitId => dispatch(removeItem(fruitId)),
  removeGuestItem: fruitId => dispatch(removeGuestItem(fruitId)),
  incrOrDecrGuestCart: (incrOrDecr, fruit) =>
    dispatch(incrOrDecrGuestCart(incrOrDecr, fruit)),
  updateQuantity: (fruitId, isIncrement) =>
    dispatch(updateQuantity(fruitId, isIncrement))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
