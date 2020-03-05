import React from 'react'

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
        <div>
          <ul>
            <li>shop fruit</li>
            <ul>
              <li>stone fruit</li>
              <li>tropical fruit</li>
              <li>berries</li>
              <li>melons</li>
              <li>citrus</li>
            </ul>
            <li>checkout</li>
            <li>log in</li>
            <li>create account</li>
          </ul>
        </div>
      </div>
    )
  }

  return null
}

export default SidebarNav
