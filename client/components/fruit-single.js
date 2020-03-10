import React from 'react'
import {connect} from 'react-redux'
import {ButtonAddToCart} from '../components'
import {singleFruitThunk} from '../store/fruit'
import {convertPrice} from '../../util/util-intDeci'

class FruitSingle extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getSingleFruit(this.props.match.params.id)
  }

  render() {
    return (
      <div id="singleFruitComp">
        <h2>{this.props.selectedFruit.name}</h2>
        <div id="singleFruitContainer">
          <div>
            <img
              src={this.props.selectedFruit.imgURL}
              alt={this.props.selectedFruit.name}
              height="180"
            />
          </div>
          <div>
            <p>{this.props.selectedFruit.description}</p>
            <p>Origin: {this.props.selectedFruit.origin}</p>
            <p>{this.props.selectedFruit.price} ea</p>
            <ButtonAddToCart /> <br />
          </div>
        </div>
        <p>{this.props.selectedFruit.description}</p>
        <p>Origin: {this.props.selectedFruit.origin}</p>
        <div>Item Price: {convertPrice(this.props.selectedFruit.price)}</div>
        <ButtonAddToCart /> <br />
        <button
          type="button"
          id="backToShopping"
          onClick={() => this.props.history.push('/fruit')}
        >
          Back to Shopping
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedFruit: state.fruit.selectedFruit
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleFruit: id => dispatch(singleFruitThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FruitSingle)
