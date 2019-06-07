import * as actionCreators from './../actions/screenStatesActions';

const screenStatesDefault = {
  isShowStartScreen: false,
  isShowEventsScreen: false,
  isShowQuestionsScreen: false,
  isShowLoginScreen: false,
  isShowSignUpScreen: false,
  isShowEventDashBoardScreen: false,
};

export default (screenStates = screenStatesDefault, action) => {
  switch (action.type) {
    case 'INIT':
      return { ...screenStatesDefault, isShowStartScreen: true };
    case actionCreators.SHOW_START_SCREEN:
      return { ...screenStatesDefault, isShowStartScreen: true };
    case actionCreators.SHOW_SIGN_UP_SCREEN:
      return { ...screenStatesDefault, isShowSignUpScreen: true };
    case actionCreators.SHOW_LOGIN_SCREEN:
      return { ...screenStatesDefault, isShowLoginScreen: true };
    case actionCreators.SHOW_QUESTIONS_SCREEN:
      return { ...screenStatesDefault, isShowQuestionsScreen: true };
    case actionCreators.SHOW_EVENTS_SCREEN:
      return { ...screenStatesDefault, isShowEventsScreen: true };
    case actionCreators.SHOW_EVENT_DASH_BOARD:
      return { ...screenStatesDefault, isShowEventDashBoardScreen: true };
    default:
      return screenStates;
  }
};
