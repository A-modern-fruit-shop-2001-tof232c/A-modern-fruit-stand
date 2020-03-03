import React from 'react'
import {connect} from 'react-redux'

const fruitSingle = props => {
  return (
    <div>
      <img scr={props.selectedFruit.imgURL} />
      <h3>{props.selectedFruit.name}</h3>
      <p>{props.selectedFruit.description}</p>
      <p>{props.selectedFruit.origin}</p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    selectedFruit: state.selectedFruit
  }
}

export default connect(mapStateToProps)(fruitSingle)
