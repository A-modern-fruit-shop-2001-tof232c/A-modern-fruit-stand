import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'
import {SidebarNav} from '../components'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openDrawer: false
    }
    this.toggleSidebarNav = this.toggleSidebarNav.bind(this)
    this.navToCart = this.navToCart.bind(this)
  }

  toggleSidebarNav() {
    this.setState({
      openDrawer: !this.state.openDrawer
    })
  }

  navToCart() {
    this.props.history.push(`/cart`)
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn
    const handleClick = this.props.handleClick

    return (
      <div id="navbarContainer">
        <SidebarNav
          openDrawer={this.state.openDrawer}
          toggleDrawer={this.toggleSidebarNav}
          isAdmin={this.props.isAdmin}
        />
        <div className="navBarHeaderLeft">
          {/* Sidebar Navigation Hamburger*/}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"
            alt="open navigation"
            height="20px"
            onClick={this.toggleSidebarNav}
          />
          <Link to="/">a modern fruit stand</Link>
        </div>

        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">home</Link>
              <a href="#" onClick={handleClick}>
                logout
              </a>
              <img
                src="https://cdn0.iconfinder.com/data/icons/ecommerce-57/100/Ecommerce_RTE-03-512.png"
                alt="Guest Cart"
                height="30px"
                onClick={this.navToCart}
              />
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">login</Link>
              <Link to="/signup">sign up</Link>
              <img
                src="https://cdn0.iconfinder.com/data/icons/ecommerce-57/100/Ecommerce_RTE-03-512.png"
                alt="Guest Cart"
                height="30px"
                onClick={this.navToCart}
              />
            </div>
          )}
        </nav>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.selectedUser.id,
    isAdmin: state.user.selectedUser.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
