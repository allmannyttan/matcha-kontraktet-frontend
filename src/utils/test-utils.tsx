import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from '../store/index'
import { Router } from 'react-router-dom'
import thunk from 'redux-thunk'

import history from './history'

const reducerInitialState = {
  contract: {
    isFetching: false,
    updateSuccess: false,
    contract: {
      id: '',
      contract_information: {
        pnr: '',
        name: '',
        address: '',
      },
      population_registration_information: {
        pnr: '',
        name: '',
        address: '',
      },
      last_population_registration_lookup: null,
      status: 'VERIFIED',
      comment: '',
    },
    hasError: false,
    errorMessage: '',
  },
  selection: {
    isFetching: false,
    selections: [],
    selection: {
      id: '',
      name: '',
      selection_term: '',
      contracts: [],
      last_population_registration_lookup: null,
      created_by: '',
      created_at: new Date(),
    },
    hasError: false,
    errorMessage: '',
  },
  system: {
    loggedIn: false,
    username: '',
    token: '',
  },
}

function render(
  ui: any,
  {
    initialState = reducerInitialState,
    store = createStore(rootReducer, applyMiddleware(thunk)),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: any) {
    return (
      <Router history={history}>
        <Provider store={store}>{children}</Provider>
      </Router>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }
