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
import {me} from '../store/user'
import {convertPrice} from '../../util/util-intDeci'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    // this.state = this.props.cart

    this.deleteItemHandler = this.deleteItemHandler.bind(this)
    this.incrementQuantityHandler = this.incrementQuantityHandler.bind(this)
    this.decrementQuantityHandler = this.decrementQuantityHandler.bind(this)
  }

  async componentDidMount() {
    //check if user data didn't load yet
    if (!this.props.isLoggedIn) {
      await this.props.getUserInfo() // dispatches me()
    }
    //after data loads, then check if user is logged in
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
    const fruitId = event.target.dataset.fruitid
    if (this.props.isLoggedIn) {
      const isIncrement = true
      this.props.updateQuantity(fruitId, isIncrement)
    } else {
      //for a guest user
      const incrOrDecr = event.target.innerHTML
      this.props.incrOrDecrGuestCart(incrOrDecr, fruitId)
    }
  }

  decrementQuantityHandler(event) {
    event.preventDefault()
    // When click will decrement the quantity of the item by one.
    const fruitId = event.target.dataset.fruitid
    if (this.props.isLoggedIn) {
      const isIncrement = false
      this.props.updateQuantity(fruitId, isIncrement)
    } else {
      //for a guest user
      const incrOrDecr = event.target.innerHTML
      this.props.incrOrDecrGuestCart(incrOrDecr, fruitId)
    }
  }

  render() {
    let cart = this.props.cart
    return (
      <div id="cartContainer">
        <h2>Your Fruit Basket</h2>
        <div id="cart">
          {cart.fruits ? (
            <div>
              {/* Map over all fruit in the cart*/}

              {cart.fruits.map(fruit => {
                return (
                  <div key={fruit.id} id="cartFruitCard">
                    <div id="fruitCartImgContainer">
                      <img
                        src={fruit.imgURL}
                        style={{maxWidth: '130px', maxHeight: '130px'}}
                      />
                    </div>
                    <div>
                      <Link to={`/fruit/${fruit.id}`}>
                        <h4>{fruit.name}</h4>
                      </Link>

                      <div>
                        <div id="incrementDiv">
                          <button
                            onClick={this.decrementQuantityHandler}
                            type="button"
                            data-fruit={fruit}
                            data-fruitid={fruit.id}
                          >
                            -
                          </button>
                          <span>Quantity: {fruit.orderFruit.quantity}</span>
                          <button
                            onClick={this.incrementQuantityHandler}
                            type="button"
                            data-fruit={fruit}
                            data-fruitid={fruit.id}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        Price Per Item:{' '}
                        {convertPrice(fruit.orderFruit.itemPrice)}{' '}
                      </div>
                      <div>
                        Item Total:{' '}
                        {convertPrice(
                          fruit.orderFruit.quantity * fruit.orderFruit.itemPrice
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={this.deleteItemHandler}
                        data-fruitid={fruit.id}
                        id="removeItemFromCart"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                )
              })}
              <div>
                {cart.fruits[0] ? (
                  <h3>Subtotal: {convertPrice(cart.orderTotal)}</h3>
                ) : null}

                <ButtonCheckout
                  orderTotal={cart.orderTotal}
                  cartId={cart.id}
                  props={this.props}
                />
              </div>
              <div>
                <Link to="/fruit">
                  <button type="button">CONTINUE SHOPPING</button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <h3>Your fruit basket is empty!</h3>
              <Link to="/fruit">
                <button type="button">CONTINUE SHOPPING</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  isLoggedIn: !!state.user.selectedUser.id,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  getGuestCart: () => dispatch(getGuestCart()),
  removeItem: fruitId => dispatch(removeItem(fruitId)),
  removeGuestItem: fruitId => dispatch(removeGuestItem(fruitId)),
  incrOrDecrGuestCart: (incrOrDecr, fruit) =>
    dispatch(incrOrDecrGuestCart(incrOrDecr, fruit)),
  updateQuantity: (fruitId, isIncrement) =>
    dispatch(updateQuantity(fruitId, isIncrement)),
  getUserInfo: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
