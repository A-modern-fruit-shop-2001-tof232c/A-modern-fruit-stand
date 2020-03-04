import React from 'react'
import {connect} from 'react-redux'

class AllFruit extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('in comp did mount')
    this.props.getAllFruit()
  }

  render() {
    let allTheFruities = this.props.allFruit
    //if the fruit has loaded, render the fruit cards
    if (allTheFruities) {
      console.log('ALLLLL', allTheFruities)
      return (
        <div id="allFruitContainer">
          <div>
            {/* Map over all available fruit */}
            {allTheFruities.map(oneFruit => {
              return (
                <div key={oneFruit.id}>
                  <div>
                    <img
                      src={oneFruit.imgURL}
                      alt={oneFruit.name}
                      height="80"
                    />
                  </div>
                  <div>
                    <div>{oneFruit.name}</div>
                    <div>{oneFruit.price}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllFruit)
