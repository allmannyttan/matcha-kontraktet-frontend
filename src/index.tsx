import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

class ErrorBoundary extends React.Component {
  componentDidCatch(error: any, info: any) {
    if (process.env.NODE_ENV === 'production') {
      console.error(error)
      console.info(info)
      // eslint-disable-next-line no-restricted-globals
      localStorage.clear()
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    }
  }

  render() {
    return this.props.children
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)
