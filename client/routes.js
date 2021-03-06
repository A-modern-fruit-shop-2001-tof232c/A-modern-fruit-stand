import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  FruitSingle,
  AllFruit,
  Cart,
  AdminContainer,
  AdminNav,
  HomePage,
  EditSingleUser,
  Checkout
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const {isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/fruit" component={AllFruit} />
        <Route path="/fruit/:id" component={FruitSingle} />
        <Route path="/cart" component={Cart} />
        <Route exact path="/admin" component={AdminNav} />
        <Route exact path="/admin/users" component={AdminContainer} />
        <Route exact path="/admin/users/:id" component={EditSingleUser} />
        <Route exact path="/admin/fruits" component={AllFruit} />
        <Route exact path="/cart/confirmation" component={Checkout} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/profile" component={UserProfile} />
            <Route path="/home" component={UserHome} />
            <Route component={HomePage} />
          </Switch>
        )}

        {isAdmin && (
          <Switch>
            <Route exact path="/admin" component={AdminNav} />
            <Route exact path="/admin/users" component={AdminContainer} />
            <Route exact path="/admin/users/:id" component={EditSingleUser} />
            <Route exact path="/admin/fruits" component={AllFruit} />
            <Route component={HomePage} />
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={HomePage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.selectedUser.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
