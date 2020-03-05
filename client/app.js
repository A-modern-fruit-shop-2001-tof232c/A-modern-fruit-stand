import React from 'react'
import {Navbar, SidebarNav} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <SidebarNav />
      {/* All Routes are in the Routes file */}
      <Routes />
    </div>
  )
}

export default App
