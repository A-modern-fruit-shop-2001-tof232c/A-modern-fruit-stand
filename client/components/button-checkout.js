import React from 'react'
import {connect} from 'react-redux'
import {checkoutCart} from '../store/cart'

class ButtonCheckout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      previousCartId: this.props.cartId,
      displayCheckOut: true
    }
    this.onCheckout = this.onCheckout.bind(this)
  }

  onCheckout(event) {
    event.preventDefault()
    this.props.checkoutCart(this.props.cartId)
    this.setState({
      previousCartId: this.props.cartId,
      displayCheckOut: false
    })
  }
  render() {
    return this.state.displayCheckOut ? (
      <div>
        <button type="button" onClick={this.onCheckout}>
          {' '}
          CHECKOUT{' '}
        </button>
      </div>
    ) : (
      <div>
        Thank you for your order! Your Confirmation Number is{' '}
        {this.state.previousCartId}
      </div>
    )
  }
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
