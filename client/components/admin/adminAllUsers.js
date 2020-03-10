import React from 'react'
import {connect} from 'react-redux'
import {deleteUserForeverThunk, oneUserThunk} from '../../store/user'
import {NavLink} from 'react-router-dom'

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
    console.log('inside all users')
    let usersCollection = this.props.matchedUsers
    if (usersCollection) {
      return (
        <div className="AllUsers">
          {usersCollection.map(element => {
            return (
              <NavLink key={element.id} to={`/admin/users/${element.id}`}>
                <div className="oneUser" name="element.id">
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
              </NavLink>
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
  allUsers: state.user,
  selectedUser: state.user.selectedUser
})

const mapDispatch = dispatch => ({
  destroyUser: id => dispatch(deleteUserForeverThunk(id)),
  getOneUser: id => dispatch(oneUserThunk(id))
})

export {AdminAllUsers}
export default connect(mapState, mapDispatch)(AdminAllUsers)
