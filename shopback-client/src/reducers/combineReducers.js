import { combineReducers } from 'redux';

import questionsReducers from './questionsReducer';
import eventsReducers from './eventsReducer';
import screenStatesReducer from './screenStatesReducer';

export default combineReducers({
  screenStates: screenStatesReducer,
  questions: questionsReducers,
  events: eventsReducers
});
