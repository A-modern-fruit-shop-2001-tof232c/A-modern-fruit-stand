import React from 'react'
import {connect} from 'react-redux'
import {AdminAllFruit, AdminAllUsers} from '../../components/index'
import {getAllFruit} from '../../store/fruit'
import {gotAllUsersThunk} from '../../store/user'

class AdminContainer extends React.Component {
  // constructor() {
  //   super()
  // }
  componentDidMount() {
    this.props.getAllFruit()
    this.props.getAllUsers()
  }
  render() {
    //ADMIN CONTAINER NEEDS:
    //ADMIN NAVBAR COMPONENT WITH LINKS TO (Users, Fruits, Orders)
    //ADMIN ALL FRUIT DISPLAY
    //ADMIN SINGLE FRUIT DISPLAY
    //ADMIN ALL USER DISPLAY
    //ADMIN SINGLE USER DISPLAY (Just view, can delete not edit)
    //ADMIN ALL ORDER DISPLAY
    //ADMIN SINGLE ORDER DISPLAY
    console.log('Made it to container!')
    return (
      <div>
        <AdminAllFruit />
        <AdminAllUsers />
      </div>
    )
  }
}

const mapState = state => ({
  allFruit: state.fruit.allFruit,
  allUsers: state.user
})

const mapDispatch = dispatch => ({
  getAllFruit: () => dispatch(getAllFruit()),
  getAllUsers: () => dispatch(gotAllUsersThunk())
})

// export const AdminContainer = connect(mapState, null)(
//   DisconnectedAdminContainer
// )
//the bare component is exported for testing
export {AdminContainer}
//the connected component is exported for actual deployment
export default connect(mapState, mapDispatch)(AdminContainer)
