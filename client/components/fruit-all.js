import React from 'react'
import {connect} from 'react-redux'
import {getAllFruit} from '../store/fruit'
import {convertPrice} from '../../util/util-intDeci'

class AllFruit extends React.Component {
  constructor(props) {
    super(props)
    this.navToSingleFruitPage = this.navToSingleFruitPage.bind(this)
  }

  navToSingleFruitPage(fruitId) {
    this.props.history.push(`/fruit/${fruitId}`)
  }

  componentDidMount() {
    this.props.getAllFruit()
  }

  render() {
    let allTheFruities = this.props.allFruit
    //if the fruit has loaded, render the fruit cards
    if (allTheFruities) {
      return (
        <div id="allFruitContainer">
          <h1>All Fruit</h1>
          <div id="allFruitMapContainer">
            {/* Map over all available fruit */}
            {allTheFruities.map(oneFruit => {
              return (
                <div
                  key={oneFruit.id}
                  className="FruitCard"
                  onClick={() => this.navToSingleFruitPage(oneFruit.id)}
                >
                  <div>
                    <img
                      src={oneFruit.imgURL}
                      alt={oneFruit.name}
                      height="80"
                    />
                  </div>
                  <div>
                    <h5>{oneFruit.name}</h5>
                    <h5>{convertPrice(oneFruit.price)}</h5>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  allFruit: state.fruit.allFruit
})

const mapDispatchToProps = dispatch => ({
  getAllFruit: () => dispatch(getAllFruit())
})

//the bare component is exported for testing
export {AllFruit}
//the connected component is exported for actual deployment
export default connect(mapStateToProps, mapDispatchToProps)(AllFruit)
