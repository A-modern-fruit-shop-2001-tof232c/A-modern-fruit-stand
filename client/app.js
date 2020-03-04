import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* All Routes are in the Routes file */}
      <Routes />
    </div>
  )
}

export default App
