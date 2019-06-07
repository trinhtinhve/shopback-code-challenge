import * as actionsCreator from './../actions/questionsActions';

const questionsDefault = [
  // {
  //   id: 0,
  //   username: '',
  //   question: '',
  //   likeCount: 0,
  //   dislikeCount: 0,
  //   isHighlight: false,
  //   createdTime: Date.now(),
  // }
];

export default (questions = questionsDefault, action) => {
  switch (action.type) {
    case 'INIT':
      return null;
    case actionsCreator.GET_QUESTIONS:
      return handleGetQuestions(questions, action.payload);
    case actionsCreator.ADD_QUESTION:
      return handleAddQuestion(questions, action.payload);
    case actionsCreator.UPDATE_QUESTION:
      return handleUpdateQuestion(questions, action.payload);
    case actionsCreator.REMOVE_ALL_QUESTION:
      return handleRemoveAll();
    case actionsCreator.REMOVE_QUESTION:
      return handleRemoveQuestion(questions, action.payload);
    default:
      return questions;
  }
}

function handleGetQuestions(questions, { questions: newQuestions }) {
  questions = questions ? questions : [];
  return [ ...questions, ...newQuestions ];
}

function handleAddQuestion(questions, { question }) {
  let result = [...questions];
  result.push(question);

  return result;
}

function handleUpdateQuestion(questions, { question }) {
  let result = [ ...questions ];
  return result.map((q) => {
    if (q.id === question.id) {
      return question;
    }
    return q;
  });
}

function handleRemoveAll() {
  return [];
}

function handleRemoveQuestion(questions, { questionId }) {
  let indexQuestionId = -1;
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].id === questionId) {
      indexQuestionId = i;
      break;
    }
  }

  if (indexQuestionId > -1) {
    let questionsResult = [ ...questions ];
    questionsResult.splice(indexQuestionId, 1);
    return questionsResult;
  }

  return questions;
}
