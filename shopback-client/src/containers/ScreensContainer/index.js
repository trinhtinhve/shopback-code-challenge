import React from 'react';
import { connect } from 'react-redux';

import StartScreenContainer from './../StartScreenContainer';
import EventsScreenContainer from './../EventScreenContainer';
import QuestionsScreenContainer from './../QuestionScreenContainer';
import LoginContainer from './../LoginContainer';
import SignUpContainer from './../SignUpContainer';
import EventDashBoardScreenContainer from './../EventDashBoardScreenContainer'

const ScreensContainer = (props) => {
  const screenStates = props.screenStates;

  return (
    <div className="screens-container">
      {screenStates.isShowStartScreen && <StartScreenContainer />}
      {screenStates.isShowEventsScreen && <EventsScreenContainer />}
      {screenStates.isShowQuestionsScreen && <QuestionsScreenContainer />}
      {screenStates.isShowLoginScreen && <LoginContainer />}
      {screenStates.isShowSignUpScreen && <SignUpContainer />}
      {screenStates.isShowEventDashBoardScreen && <EventDashBoardScreenContainer />}
    </div>
  );
};

const mapStateToProps = (state) => {
  const screenStates = state.screenStates;
  return { screenStates };
};

export default connect(mapStateToProps)(ScreensContainer);
