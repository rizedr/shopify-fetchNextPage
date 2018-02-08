import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

function configureStore(initialState) {
  const middlewares = [
    thunk,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];
  /* eslint-disable */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers),
  );
}

const store = configureStore();

export default store;
