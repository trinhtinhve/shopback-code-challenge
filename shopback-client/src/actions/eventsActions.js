const PRE_FIX = 'eventsList/';

export const GET_EVENTS = PRE_FIX + 'GET_EVENTS';
export const ADD_EVENTS = PRE_FIX + 'ADD_EVENTS';
export const EDIT_EVENT = PRE_FIX + 'EDIT_EVENT';
export const DELETE_EVENT = PRE_FIX + 'DELETE_EVENT';
export const UPDATE_EVENT = PRE_FIX + 'UPDATE_EVENT';

export function getEvents(events) {
  return {
    type: GET_EVENTS,
    payload: {
      events
    }
  };
}

export function addEvent(event) {
  return {
    type: ADD_EVENTS,
    payload: {
      event
    }
  };
}

export function editEvent(event, oldEventCode) {
  return {
    type: EDIT_EVENT,
    payload: {
      event,
      oldEventCode
    }
  };
}

export function deleteEvent(eventCode) {
  return {
    type: DELETE_EVENT,
    payload: {
      eventCode
    }
  };
}

export function updateEvent(event) {
  return {
    type: UPDATE_EVENT,
    payload: {
      event
    }
  };
}
