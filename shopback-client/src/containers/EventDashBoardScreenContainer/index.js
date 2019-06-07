import { connect } from 'react-redux';
import EventDashBoardScreen from './../../components/EventDashBoardScreen';
import { removeAllQuestion } from './../../actions/questionsActions';
import { showEventsScreen } from './../../actions/screenStatesActions';

import apiService from './../../services/apiService';
import socketService from './../../services/socketService';
import globalData from './../../services/globalData';
import commandTypes from './../../services/CommandTypes';

import registerGeneralEvents from '../../services/registerHandlers';

const getConnectionStringSuccess = (response, dispatch) => {
  const { serverConnectionString } = response;

  socketService.init(serverConnectionString, () => {
    registerGeneralEvents(dispatch);

    let sendData = socketService.makeSendData(commandTypes.joinRoomWithAdminRole);
    sendData.addParam('eventCode', globalData.eventCode).addParam('token', globalData.token);
    socketService.send(sendData);
  });
};

const handleComponentDidMount = (dispatch) => {
  apiService.getConnectionStringByEventCode(globalData.eventCode,
    (response) => {
      getConnectionStringSuccess(response, dispatch);
    },
    (error) => {
      alert(error.message);
    }
  );
};

const handleBackClick = (dispatch) => {
  dispatch(removeAllQuestion());
  dispatch(showEventsScreen());
  socketService.destroy();
};

const handleSaveQuestion = (questionId, question) => {
  let sendData = socketService.makeSendData(commandTypes.editQuestion);
  sendData.addParam('eventCode', globalData.eventCode).addParam('questionId', questionId).addParam('question', question);
  socketService.send(sendData);
};

const handleHighlight = (questionId) => {
  let sendData = socketService.makeSendData(commandTypes.highlightQuestion);
  sendData.addParam('eventCode', globalData.eventCode).addParam('questionId', questionId);
  socketService.send(sendData);
};

const handleRemoveClick = (questionId) => {
  let sendData = socketService.makeSendData(commandTypes.deleteQuestion);
  sendData.addParam('eventCode', globalData.eventCode).addParam('questionId', questionId);
  socketService.send(sendData);
};

const findEventByEventCode = (code, events) => {
  for (let i = 0; i < events.length; i++) {
    if (events[i].eventCode === code) return events[i];
  }

  return null;
};

const mapStateToProps = (state) => {
  const { questions, events } = state;
  const event = findEventByEventCode(globalData.eventCode, events);
  return { questions, event };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleComponentDidMount: () => handleComponentDidMount(dispatch),
    handleBackClick: () => handleBackClick(dispatch),
    handleSaveQuestion: (questionId, question) => handleSaveQuestion(questionId, question, dispatch),
    handleHighlight: (questionId) => handleHighlight(questionId),
    handleRemoveClick: (questionId) => handleRemoveClick(questionId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDashBoardScreen);
