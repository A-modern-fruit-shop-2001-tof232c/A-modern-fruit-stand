import React from 'react'
import {NavLink} from 'react-router-dom'

/*
Admin Nav should Include:
Manage Users
Manage Products
Add New Product
*/

function AdminNav() {
  return (
    <ol>
      <NavLink to="/admin/users">
        <li>Manage Users</li>
      </NavLink>
      <NavLink to="/admin/fruits">
        <li>Manage Products</li>
      </NavLink>
      <NavLink to="/admin/newFruit">
        <li>Add New Product</li>
      </NavLink>
    </ol>
  )
}

export default AdminNav
