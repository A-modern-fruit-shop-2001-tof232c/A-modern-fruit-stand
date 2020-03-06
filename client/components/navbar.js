import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {SidebarNav} from '../components'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openDrawer: false
    }
    this.toggleSidebarNav = this.toggleSidebarNav.bind(this)
  }

  toggleSidebarNav() {
    this.setState({
      openDrawer: !this.state.openDrawer
    })
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn
    const handleClick = this.props.handleClick

    return (
      <div id="navbarContainer">
        <SidebarNav
          openDrawer={this.state.openDrawer}
          toggleDrawer={this.toggleSidebarNav}
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
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
