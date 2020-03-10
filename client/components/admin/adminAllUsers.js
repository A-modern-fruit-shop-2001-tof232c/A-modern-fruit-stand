import React from 'react'
import {connect} from 'react-redux'
import {deleteUserForeverThunk} from '../../store/user'

class AdminAllUsers extends React.Component {
  constructor(props) {
    super(props)

    this.handleClickDelete = this.handleClickDelete.bind(this)
  }
  handleClickDelete(event) {
    event.preventDefault()
    console.log('delete clicked')
    this.props.destroyUser(event.target.name)
  }

  render() {
    //console.log('inside all users', this.props)
    let usersCollection = this.props.matchedUsers
    if (usersCollection) {
      return (
        <div className="AllUsers">
          {usersCollection.map(element => {
            return (
              <div className="usersList" key={element.id}>
                <img src={element.imgURL} height="50" width="50" />
                <p>{`${element.firstName} ${element.lastName}`}</p>
                <button
                  type="submit"
                  name={element.id}
                  onClick={this.handleClickDelete}
                >
                  Delete
                </button>

                <p>{element.email}</p>
                <span>
                  <p>Is Admin?</p>
                  <input type="checkbox" />
                </span>
              </div>
            )
          })}
        </div>
      )
    } else {
      return <p>Loading!</p>
    }
  }
}

const mapState = state => ({
  allUsers: state.user
})

const mapDispatch = dispatch => ({
  destroyUser: id => dispatch(deleteUserForeverThunk(id))
})

export {AdminAllUsers}
export default connect(mapState, mapDispatch)(AdminAllUsers)
