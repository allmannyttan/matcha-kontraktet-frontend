import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { systemReducer } from "./system/reducers";
import { selectionReducer } from "./selection/reducers";
import { contractReducer } from "./contract/reducers";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
  system: systemReducer,
  selection: selectionReducer,
  contract: contractReducer,
});

const persistConfig = {
  key: "matcha-kontraktet",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
