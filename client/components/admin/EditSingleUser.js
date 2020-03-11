import React from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../../store/user'

class EditSingleUser extends React.Component {
  constructor() {
    super()
    this.state = {
      newFirstName: '',
      newLastName: '',
      newEmail: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    const updatedUser = {
      firstName: this.state.newFirstName,
      lastName: this.state.newLastName,
      email: this.state.newEmail
    }
    this.props.updateUser(this.props.match.params.id, updatedUser)
  }

  handleChange(event) {
    const name = event.target.name
    this.setState({[name]: event.target.value})
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={this.state.newFirstName}
            name="newFirstName"
            onChange={this.handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={this.state.newLastName}
            name="newLastName"
            onChange={this.handleChange}
          />
        </label>
        <label>
          Update Email:
          <input
            type="text"
            value={this.state.newEmail}
            name="newEmail"
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Save" />
      </form>
    )
  }
}

const mapState = state => ({
  selectedUser: state.user.selectedUser
})

const mapDispatch = dispatch => ({
  updateUser: (id, userUpdates) => dispatch(updateUser(id, userUpdates))
})

export {EditSingleUser}

export default connect(mapState, mapDispatch)(EditSingleUser)
