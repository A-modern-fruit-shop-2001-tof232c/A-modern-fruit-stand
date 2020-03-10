import React from 'react'
import {connect} from 'react-redux'
import {autofill} from '../../../script/autofill'
import {AdminAllUsers} from '../admin/adminAllUsers'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: '',
      matches: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({searchInput: event.target.value})
    let currInput = this.state.searchInput
    console.log(currInput)
    if (this.props.typeSearch === 'user') {
      let myMatches = autofill(currInput, this.props.allUsers, 'firstName')
      this.setState({matches: myMatches})
      console.log(this.state.matches)
    } else {
      console.log('Meow')
    }
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div className="searchBar">
        <form>
          <label>
            Search
            <input
              type="text"
              value={this.state.searchInput}
              onChange={this.handleChange}
            />
          </label>
        </form>
        {this.state.searchInput === '' ? (
          <AdminAllUsers matchedUsers={this.props.allUsers} />
        ) : (
          <AdminAllUsers matchedUsers={this.state.matches} />
        )}
      </div>
    )
  }
}

const mapState = state => ({
  allFruit: state.fruit.allFruit,
  allUsers: state.user.allUsers
})

//export const AdminAllFruit = connect(mapState, mapDispatch)(DisconnectedAllFruitAdmin)
//the bare component is exported for testing
export {SearchBar}
//the connected component is exported for actual deployment
export default connect(mapState, null)(SearchBar)
