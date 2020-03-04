import React from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log('in comp did mount for cart')
    this.props.getCart()
  }

  render() {
    let cart = this.props.cart
    console.log(cart)
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
                  <div>OTY: {fruit.orderFruit.quantity}</div>
                  <div>Price: {fruit.orderFruit.price}</div>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
