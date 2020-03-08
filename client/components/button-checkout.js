import React from 'react'
import {connect} from 'react-redux'
import {checkoutCart} from '../store/cart'

const ButtonCheckout = props => {
  return (
    <div>
      <button type="button" onClick={() => props.checkoutCart(props.cartId)} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkoutCart: id => dispatch(checkoutCart(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonCheckout)
