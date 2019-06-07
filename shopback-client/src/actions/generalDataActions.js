const PRE_FIX = 'eventsList/';

export const SET_TOKEN = PRE_FIX + 'SET_TOKEN';
export const SET_EVENT_CODE = PRE_FIX + 'SET_EVENT_CODE';

export function setToken(token) {
  return {
    type: SET_TOKEN,
    payload: {
      token
    }
  };
}

export function setEventCode(eventCode) {
  return {
    type: SET_EVENT_CODE,
    payload: {
      eventCode
    }
  };
}
