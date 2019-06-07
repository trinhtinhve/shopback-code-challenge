import { connect } from 'react-redux';
import QuestionsScreen from './../../components/QuestionsScreen';
import { showStartScreen } from './../../actions/screenStatesActions'

import socketService from './../../services/socketService';
import apiService from './../../services/apiService';
import globalData from './../../services/globalData';
import commandTypes from './../../services/CommandTypes';

import registerHandlers from '../../services/registerHandlers';

const getConnectionStringSuccess = (response, dispatch) => {
  const { serverConnectionString } = response;

  socketService.init(serverConnectionString, () => {
    registerHandlers(dispatch);

    let sendData = socketService.makeSendData(commandTypes.joinRoom);
    sendData.addParam('eventCode', globalData.eventCode);
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
      dispatch(showStartScreen());
    }
  );
};

const makeQuestion = (username, question) => {
  let sendData = socketService.makeSendData(commandTypes.makeQuestion);
  sendData.addParam('username', username).addParam('question', question);
  socketService.send(sendData);
};

const handleLikeOrDislikeClick = (questionId, like) => {
  let sendData = socketService.makeSendData(commandTypes.likeOrDislike);
  sendData.addParam('eventCode', globalData.eventCode).addParam('questionId', questionId).addParam('like', like);
  socketService.send(sendData);
};

const mapStateToProps = (state) => {
  const { questions } = state;
  return { questions };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleComponentDidMount: () => handleComponentDidMount(dispatch),
    makeQuestion: (username, question) => makeQuestion(username, question),
    handleLikeOrDislikeClick: (questionId, like) => handleLikeOrDislikeClick(questionId, like),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsScreen);
