import React from 'react'
import Start from '../routes/Start/Start'
import Login from '../routes/Login/Login'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <PrivateRoute path="/">
        <Start />
      </PrivateRoute>
    </Switch>
  )
}

export default App
