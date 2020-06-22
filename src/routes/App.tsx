import React from 'react'
import Start from '../routes/Start/Start'
import Login from '../routes/Login/Login'
import Selection from '../routes/Selection'
import Contract from '../routes/Contract'
import CreateSelection from '../routes/CreateSelection'
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
          <PrivateRoute path="/skapa-urval">
            <CreateSelection />
          </PrivateRoute>
          <PrivateRoute path="/urval/:selectionId">
            <Selection />
          </PrivateRoute>
          <PrivateRoute path="/kontrakt/:contractId">
            <Contract />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Start />
          </PrivateRoute>
        </Switch>
      </Layout>
    </>
  )
}

export default App
