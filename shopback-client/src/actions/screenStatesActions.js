const PRE_FIX = 'screenStates/';

export const SHOW_START_SCREEN = PRE_FIX + 'SHOW_START_SCREEN';
export const SHOW_EVENTS_SCREEN = PRE_FIX + 'SHOW_EVENTS_SCREEN';
export const SHOW_QUESTIONS_SCREEN = PRE_FIX + 'SHOW_QUESTIONS_SCREEN';
export const SHOW_LOGIN_SCREEN = PRE_FIX + 'SHOW_LOGIN_SCREEN';
export const SHOW_SIGN_UP_SCREEN = PRE_FIX + 'SHOW_SIGN_UP_SCREEN';
export const SHOW_EVENT_DASH_BOARD = PRE_FIX + 'SHOW_EVENT_DASH_BOARD';

export function showStartScreen() {
  return {
    type: SHOW_START_SCREEN,
  };
}

export function showEventsScreen() {
  return {
    type: SHOW_EVENTS_SCREEN,
  };
}

export function showQuestionsScreen() {
  return {
    type: SHOW_QUESTIONS_SCREEN,
  };
}

export function showLoginScreen() {
  return {
    type: SHOW_LOGIN_SCREEN,
  };
}

export function showSignUpScreen() {
  return {
    type: SHOW_SIGN_UP_SCREEN,
  };
}

export function showEventDashBoardScreen() {
  return {
    type: SHOW_EVENT_DASH_BOARD
  };
}
