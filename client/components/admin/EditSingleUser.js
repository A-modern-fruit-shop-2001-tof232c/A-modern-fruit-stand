import React from 'react'
import {connect} from 'react-redux'

class EditSingleUser extends React.Component {
  constructor() {
    super()
  }
  render() {
    return <p>Hi</p>
  }
}

const mapState = state => ({
  selectedUser: state.user.selectedUser
})

const mapDispatch = state => ({})

export {EditSingleUser}

export default connect(mapState, null)(EditSingleUser)
