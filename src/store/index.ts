import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { systemReducer } from './system/reducers'
import { selectionReducer } from './selection/reducers'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  system: systemReducer,
  selection: selectionReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
