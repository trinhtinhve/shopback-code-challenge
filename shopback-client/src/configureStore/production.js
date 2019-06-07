import { createStore } from 'redux';
import combineReducers from '../reducers/combineReducers';

export default function configureStore() {
  return createStore(
    combineReducers
  );
};
