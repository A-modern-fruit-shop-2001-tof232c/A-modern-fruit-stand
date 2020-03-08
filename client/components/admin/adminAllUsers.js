import React from 'react'
import {connect} from 'react-redux'

class AdminAllUsers extends React.Component {
  // constructor() {
  //   super()

  //   //this.handleClick = this.handleClick.bind(this)
  // }
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

export {AdminAllUsers}
export default connect(mapState, null)(AdminAllUsers)
