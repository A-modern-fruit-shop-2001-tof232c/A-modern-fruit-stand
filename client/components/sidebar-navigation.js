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
          <Link to="/fruit" className="NavBulletPoint">
            shop fruit
          </Link>
          <br />
          <Link to="/fruit" className="NavSubBulletPoint">
            stone fruit
          </Link>
          <br />
          <Link to="/fruit" className="NavSubBulletPoint">
            tropical fruit
          </Link>
          <br />
          <Link to="/fruit" className="NavSubBulletPoint">
            berries
          </Link>
          <br />
          <Link to="/fruit" className="NavSubBulletPoint">
            melons
          </Link>
          <br />
          <Link to="/fruit" className="NavSubBulletPoint">
            citrus
          </Link>
          <br />
          <Link to="/fruit" className="NavBulletPoint">
            checkout
          </Link>
          <br />
          <Link to="/login" className="NavBulletPoint">
            log in
          </Link>
          <br />
          <Link to="/signup" className="NavBulletPoint">
            create account
          </Link>
          <br />
          <Link to="/fruit" className="NavBulletPoint">
            admin tools
          </Link>
          <br />
        </div>
      </div>
    )
  }

  return null
}

export default SidebarNav
