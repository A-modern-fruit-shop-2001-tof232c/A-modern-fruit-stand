import React from 'react'
import {connect} from 'react-redux'
import FruitAllSingleBox from './fruit-all-singlebox'

class AllFruit extends React.Component {
  constructor() {
    super()
  }

  render() {
    //if the fruit has loaded, render the fruit cards
    if (this.props.allFruit) {
      return (
        <div id="allFruitContainer">
          {this.props.AllFruit.map(oneFruit => {
            return <div key={oneFruit.id}>hi ${oneFruit}</div>
          })}
        </div>
      )
    }
  }
}

const mapState = state => ({
  allFruit: state.fruit.allFruit
})

// const mapDispatch = (dispatch) => ({

// })

export default connect(mapState, null)(AllFruit)
