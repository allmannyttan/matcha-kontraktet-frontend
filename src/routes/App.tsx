import React from 'react'
import Start from '../routes/Start/Start'
import Login from '../routes/Login/Login'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
import Layout from '../components/Layout'
import Header from '../components/Header'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Layout>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/">
            <Start />
          </PrivateRoute>
        </Switch>
      </Layout>
    </>
  )
}

export default App
