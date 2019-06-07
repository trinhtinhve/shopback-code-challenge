import commandTypes from './CommandTypes';
import { getQuestions } from './../actions/questionsActions';

const handleMessages = (socket, msg, store) => {
  switch (msg.cmd) {
    case commandTypes.getQuestions:
      getQuestionsHandler(msg.params, store);
      break;
    default:
      return;
  }
};

function getQuestionsHandler(params, store) {
  console.log('params', params);

  if (!params.questions) return;

  store.dispatch(getQuestions(params.questions));
}

export default handleMessages;
