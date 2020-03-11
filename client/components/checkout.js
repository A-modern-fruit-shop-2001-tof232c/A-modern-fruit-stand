import React from 'react'
import {connect} from 'react-redux'
import {convertPrice} from '../../util/util-intDeci'

class Checkout extends React.Component {
  render() {
    let order = this.props.order
    let orderTotal = this.props.orderTotal
    return (
      <div>
        <h1>THANK YOU FOR YOUR PURCHASE</h1>
        <div>
          <p>Your Confirmation Number is: {order}</p>
          <p>
            Order Total: {convertPrice(orderTotal)} will be charged upon
            shipping.
          </p>
        </div>
      </div>
    )
  }
}

export default Checkout
