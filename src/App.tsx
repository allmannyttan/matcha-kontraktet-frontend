import React from 'react'
import './App.css'
import { Router } from 'react-router-dom'
import App from './routes/App'
import history from './utils/history'

const RootApp: React.FC = () => {
  return (
    <Router history={history}>
      <App />
    </Router>
  )
}

export default RootApp
