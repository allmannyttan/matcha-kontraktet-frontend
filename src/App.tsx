import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './routes/App'

const RootApp: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default RootApp
