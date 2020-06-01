import React from 'react'
import './App.css'
import { Router } from 'react-router-dom'
import App from './routes/App'
import history from './utils/history'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './store'

const RootApp: React.FC = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <PersistGate loading={<p>loading...</p>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Router>
  )
}

export default RootApp
