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
  }
}

const mapStateToProps = state => ({
  cart: state
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
