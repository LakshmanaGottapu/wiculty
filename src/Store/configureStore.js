import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';
import rootReducer from '../Reducers/rootReducer';

export const history = createBrowserHistory()

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router', 'courseDetails']
}

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const middlewares = [routerMiddleware(history), thunk];
if (process.env.REACT_APP_ENV === 'development') {
  middlewares.push(logger); // log reducer changes only in development mode
}

export default function configureStore (preloadedState) {
  const store = createStore(
    persistedReducer, // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(...middlewares)
    )
  )
  const persistor = persistStore(store)
  return { store, persistor }
}
