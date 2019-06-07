const PRE_FIX = 'questionsList/';

export const GET_QUESTIONS = PRE_FIX + 'GET_QUESTIONS';
export const ADD_QUESTION = PRE_FIX + 'ADD_QUESTION';
export const UPDATE_QUESTION = PRE_FIX + 'UPDATE_QUESTION';
export const REMOVE_ALL_QUESTION = PRE_FIX + 'REMOVE_ALL_QUESTION';
export const REMOVE_QUESTION = PRE_FIX + 'REMOVE_QUESTION';

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    payload: {
      questions
    }
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    payload: {
      question
    }
  };
}

export function updateQuestion(question) {
  return {
    type: UPDATE_QUESTION,
    payload: {
      question
    }
  };
}

export function removeAllQuestion() {
  return {
    type: REMOVE_ALL_QUESTION,
  };
}

export function removeQuestion(questionId) {
  return {
    type: REMOVE_QUESTION,
    payload: {
      questionId
    }
  };
}
