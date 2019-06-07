import { connect } from 'react-redux';
import StartScreen from './../../components/StartScreen';

import globalData from './../../services/globalData';
import * as screenStatesActions from './../../actions/screenStatesActions';

const handleCreateEventClick = (dispatch) => {
  if (globalData.token === '') {
    dispatch(screenStatesActions.showLoginScreen());
  } else {
    dispatch(screenStatesActions.showEventsScreen());
  }
};

const handleJoinEventClick = (eventCode, dispatch) => {
  globalData.eventCode = eventCode;
  dispatch(screenStatesActions.showQuestionsScreen());
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateEventClick: () => handleCreateEventClick(dispatch),
    handleJoinEventClick: (eventCode) => handleJoinEventClick(eventCode, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(StartScreen);
