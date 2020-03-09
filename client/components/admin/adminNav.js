import React from 'react'
import {Link} from 'react-router-dom'

/*
Admin Nav should Include:
Manage Users
Manage Products
Add New Product
*/

const AdminNav = props => {
  console.log('AdminNavHere!')
  return (
    <div>
      <ol>
        <li>Add New Product</li>
      </ol>
    </div>
  )
}

export {AdminNav}
