import * as actionsCreator from './../actions/eventsActions';

const eventsDefault = [
  // {
  //   eventCode: '',
  //   eventName: '',
  //   createdBy: '',
  //   updatedBy: 'none',
  //   startTime: null,
  //   endTime: null,
  //   highlightCount: 0
  // },
];

export default (events = eventsDefault, action) => {
  switch (action.type) {
    case 'INIT':
      return null;
    case actionsCreator.GET_EVENTS:
      return handleGetEvents(action.payload);
    case actionsCreator.ADD_EVENTS:
      return handleAddEvent(events, action.payload);
    case actionsCreator.EDIT_EVENT:
      return handleEditEvent(events, action.payload);
    case actionsCreator.DELETE_EVENT:
      return handleDeleteEvent(events, action.payload);
    case actionsCreator.UPDATE_EVENT:
      return handleUpdateEvent(events, action.payload);
    default:
      return events;
  }
}

function handleGetEvents({ events }) {
  return [ ...events ];
}

function handleAddEvent(events, { event }) {
  let result = [ ...events ];
  result.push(event);

  return result;
}

function handleEditEvent(events, { event: editedEvent, oldEventCode }) {
  return events.map((event) => {
    if (event.eventCode === oldEventCode) return editedEvent;
    return event;
  });
}

function handleDeleteEvent(events, { eventCode }) {
  let indexOfEvent = -1;
  for (let i = 0; i < events.length; i++) {
    if (events[i].eventCode === eventCode) {
      indexOfEvent = i;
      break;
    }
  }

  if (indexOfEvent > -1) {
    let newEvents = [ ...events ];
    newEvents.splice(indexOfEvent, 1);
    return newEvents;
  }

  return events;
}

function handleUpdateEvent(events, { event }) {
  if (!events) return events;

  let result = [ ...events ];
  return result.map((e) => {
    if (e.eventCode === event.eventCode) {
      return event;
    }
    return e;
  });
}
