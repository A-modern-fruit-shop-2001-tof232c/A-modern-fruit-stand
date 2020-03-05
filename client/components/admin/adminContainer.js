import React from 'react'
import {connect} from 'react-redux'

class DisconnectedAdminContainer extends React.Component {
  constructor() {
    super()
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
    return <p>hi</p>
  }
}

export const AdminContainer = connect(mapState, null)(
  DisconnectedAdminContainer
)
