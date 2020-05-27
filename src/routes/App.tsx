import React from 'react'
import Start from '../routes/Start/Start'
import Login from '../routes/Login/Login'
import { Switch, Route } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Start />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  )
}

export default App
