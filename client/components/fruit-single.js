import React from 'react'
import {connect} from 'react-redux'
import {ButtonAddToCart} from '../components'

const FruitSingle = props => {
  return (
    <div>
      <img scr={props.selectedFruit.imgURL} />
      <h3>{props.selectedFruit.name}</h3>
      <p>{props.selectedFruit.description}</p>
      <p>Origin: {props.selectedFruit.origin}</p>
      <div>{props.selectedFruit.price}</div>
      <ButtonAddToCart />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectedFruit: state.fruit.selectedFruit
  }
}

export default connect(mapStateToProps)(FruitSingle)
