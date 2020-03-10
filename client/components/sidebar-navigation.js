import React from 'react'
import {Link} from 'react-router-dom'

const SidebarNav = props => {
  if (props.openDrawer) {
    return (
      <div id="sidebarNav">
        <div id="sidebarNavHeader">
          <h6>modern fruit</h6>
          <div onClick={props.toggleDrawer}>
            <img
              src="https://www.materialui.co/materialIcons/navigation/close_black_1024x1024.png"
              alt="close navigation"
              height="20px"
            />
          </div>
        </div>
        <div id="sidebarNavLinks">
          <br />
          <br />
          <Link
            to="/fruit"
            className="NavBulletPoint"
            onClick={props.toggleDrawer}
          >
            shop fruit
          </Link>
          <br />
          <Link
            to="/fruit"
            className="NavSubBulletPoint"
            onClick={props.toggleDrawer}
          >
            stone fruit
          </Link>
          <br />
          <Link
            to="/fruit"
            className="NavSubBulletPoint"
            onClick={props.toggleDrawer}
          >
            tropical fruit
          </Link>
          <br />
          <Link
            to="/fruit"
            className="NavSubBulletPoint"
            onClick={props.toggleDrawer}
          >
            berries
          </Link>
          <br />
          <Link
            to="/fruit"
            className="NavSubBulletPoint"
            onClick={props.toggleDrawer}
          >
            melons
          </Link>
          <br />
          <Link
            to="/fruit"
            className="NavSubBulletPoint"
            onClick={props.toggleDrawer}
          >
            citrus
          </Link>
          <br />
          <br />
          <Link
            to="/cart"
            className="NavBulletPoint"
            onClick={props.toggleDrawer}
          >
            cart
          </Link>
          <br />
          <Link
            to="/login"
            className="NavBulletPoint"
            onClick={props.toggleDrawer}
          >
            log in
          </Link>
          <br />
          <Link
            to="/signup"
            className="NavBulletPoint"
            onClick={props.toggleDrawer}
          >
            create account
          </Link>
          <br />
          {props.isAdmin ? (
            <Link
              to="/admin"
              className="NavBulletPoint"
              onClick={props.toggleDrawer}
            >
              admin tools
            </Link>
          ) : (
            ''
          )}
          <br />
        </div>
      </div>
    )
  }

  return null
}

export default SidebarNav
