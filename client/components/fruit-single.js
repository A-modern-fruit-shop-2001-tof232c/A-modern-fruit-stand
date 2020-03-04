import React from 'react'
import {connect} from 'react-redux'
import {ButtonAddToCart} from '../components'
import {singleFruitThunk} from '../store/fruit'

class FruitSingle extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getSingleFruit(this.props.match.params.id)
  }
  render() {
    return (
      <div>
        <h3>{this.props.selectedFruit.name}</h3>
        <div>
          <img
            src={this.props.selectedFruit.imgURL}
            alt={this.props.selectedFruit.name}
            height="180"
          />
        </div>
        {console.log('selected', this.props.selectedFruit.imgURL)}
        <p>{this.props.selectedFruit.description}</p>
        <p>Origin: {this.props.selectedFruit.origin}</p>
        <div>{this.props.selectedFruit.price}</div>
        <ButtonAddToCart />
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
