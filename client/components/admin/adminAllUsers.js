import React from 'react'
import {connect} from 'react-redux'
import {deleteUserForeverThunk} from '../../store/user'

class AdminAllUsers extends React.Component {
  constructor() {
    super()

    this.handleClickDelete = this.handleClickDelete.bind(this)
  }
  handleClickDelete(event) {
    event.preventDefault()
    this.props.destroyUser(event.target.name)
  }

  render() {
    let usersCollection = this.props.allUsers.allUsers
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
