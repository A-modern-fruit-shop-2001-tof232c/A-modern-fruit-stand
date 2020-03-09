import React from 'react'
import {connect} from 'react-redux'
import {
  getCart,
  getGuestCart,
  removeItem,
  removeGuestItem,
  incrOrDecrGuestCart
} from '../store/cart'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.cart
    this.componentDidMount = this.componentDidMount.bind(this)
    this.deleteItemHandler = this.deleteItemHandler.bind(this)
    this.incrementQuantityHandler = this.incrementQuantityHandler.bind(this)
    this.decrementQuantityHandler = this.deleteItemHandler.bind(this)
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
    if (!this.props.isLoggedIn) {
      const incrOrDecr = event.target.innerHTML
      const fruit = event.target.dataset.fruit
      this.props.incrOrDecrGuestCart(incrOrDecr, fruit)
    }
  }

  decrementQuantityHandler(event) {
    event.preventDefault()
    // When click will decrement the quantity of the item by one.
    if (!this.props.isLoggedIn) {
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
                      data-fruit={fruit}
                      type="button"
                    >
                      +
                    </button>
                    <div>QTY: {fruit.orderFruit.quantity}</div>
                    <button
                      onClick={this.decrementQuantityHandler}
                      data-fruit={fruit}
                      type="button"
                    >
                      -
                    </button>
                  </div>
                  <div>Price Per Item: {fruit.orderFruit.itemPrice} </div>
                  <div>Item Total: {fruit.orderFruit.itemTotal}</div>
                </div>
              )
            })}
          </div>
          <div>
            <h3>Subtotal: {cart.orderTotal}</h3>
          </div>
          <div>
            <button type="button">PROCEED TO CHECK OUT</button>
            <Link to="/fruit">
              <button type="button">CONTINUE SHOPPING</button>
            </Link>
          </div>
        </div>
      )
    } else {
      return <div>Loading...</div>
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
    dispatch(incrOrDecrGuestCart(incrOrDecr, fruit))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
