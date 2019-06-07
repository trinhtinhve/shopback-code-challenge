import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import combineReducers from '../reducers/combineReducers';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

export default function configureStore() {
  return createStoreWithMiddleware(
    combineReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};
