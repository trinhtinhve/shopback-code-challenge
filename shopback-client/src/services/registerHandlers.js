import socketService from './socketService';
import commandTypes from './CommandTypes';
import globalData from './globalData';

import * as questionActions from './../actions/questionsActions';
import { showStartScreen } from "../actions/screenStatesActions";
import { updateEvent } from "../actions/eventsActions";

const registerGeneralEvents = (dispatch) => {
  socketService.registerHandler(commandTypes.joinRoomWithAdminRole, (params) => {
    if (params.error !== '') {
      alert(params.error);
      dispatch(showStartScreen());
      return;
    }

    let sendData = socketService.makeSendData(commandTypes.getQuestions);
    sendData.addParam('eventCode', globalData.eventCode);
    socketService.send(sendData);
  });

  socketService.registerHandler(commandTypes.joinRoom, (params) => {
    if (params.error !== '') {
      alert(params.error);
      dispatch(showStartScreen());
      return;
    }

    let sendData = socketService.makeSendData(commandTypes.getQuestions);
    sendData.addParam('eventCode', globalData.eventCode);
    socketService.send(sendData);
  });

  socketService.registerHandler(commandTypes.getQuestions, (params) => {
    if (params.error !== '') {
      alert(params.error);
      return;
    }
    dispatch(questionActions.getQuestions(params.questions));
  });

  socketService.registerHandler(commandTypes.getQuestion, (params) => {
    if (params.error !== '') {
      alert(params.error);
      return;
    }
    dispatch(questionActions.addQuestion(params.question));
  });

  socketService.registerHandler(commandTypes.makeQuestion, (params) => {
    if (params.error !== '') {
      alert(params.error);
    }
  });

  socketService.registerHandler(commandTypes.likeOrDislike, (params) => {
    if (params.error !== '') {
      alert(params.error);
      return;
    }
    dispatch(questionActions.updateQuestion(params.question));
  });

  socketService.registerHandler(commandTypes.editQuestion, (params) => {
    if (params.error !== '') {
      alert(params.error);
      return;
    }
    dispatch(questionActions.updateQuestion(params.question));
  });

  socketService.registerHandler(commandTypes.highlightQuestion, (params) => {
    if (params.error !== '') {
      alert(params.error);
      return;
    }
    dispatch(questionActions.updateQuestion(params.question));
    dispatch(updateEvent(params.event));
  });

  socketService.registerHandler(commandTypes.deleteQuestion, (params) => {
    if (params.error !== '') {
      alert(params.error);
      return;
    }
    dispatch(questionActions.removeQuestion(params.questionId));
  });

};

export default registerGeneralEvents;
