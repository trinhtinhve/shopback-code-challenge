import { connect } from 'react-redux';
import EventsScreen from './../../components/EventsScreen';
import * as eventsActions from './../../actions/eventsActions';
import { showEventDashBoardScreen } from './../../actions/screenStatesActions';

import apiService from './../../services/apiService';
import globalData from './../../services/globalData';

const handleComponentDidMount = (dispatch) => {
  apiService.getEvents(
    (response) => {
      dispatch(eventsActions.getEvents(response.events));
    },
    (error) => {
      alert(error.message);
    }
  );
};

const handleCreateEventClick = (eventName, eventCode, startTime, endTime, dispatch) => {
  apiService.createEvent(eventName, eventCode, startTime, endTime,
    (response) => {
      dispatch(eventsActions.addEvent(response.event))
    },
    (error) => {
      alert(error.message);
    }
  );
};

const handleEditEventClick = (eventName, eventCode, startTime, endTime, oldEventCode, dispatch) => {
  apiService.editEvent(eventName, eventCode, startTime, endTime, oldEventCode,
    (response) => {
      dispatch(eventsActions.editEvent(response.event, response.oldEventCode))
    },
    (error) => {
      alert(error.message);
    }
  );
};

const handleDeleteEventClick = (eventCode, dispatch) => {
  apiService.deleteEvent(eventCode,
    (response) => {
      dispatch(eventsActions.deleteEvent(response.eventCode))
    },
    (error) => {
      alert(error.message);
    }
  );
};

const handleEventItemClick = (eventCode, dispatch) =>  {
  globalData.eventCode = eventCode;
  dispatch(showEventDashBoardScreen());
};

const mapStateToProps = (state) => {
  const { events } = state;
  return { events };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleComponentDidMount: () => handleComponentDidMount(dispatch),
    handleCreateEventClick: (eventName, eventCode, startTime, endTime) => handleCreateEventClick(eventName, eventCode, startTime, endTime, dispatch),
    handleEditEventClick: (eventName, eventCode, startTime, endTime, oldEventCode) => handleEditEventClick(eventName, eventCode, startTime, endTime, oldEventCode, dispatch),
    handleDeleteEventClick: (eventCode) => handleDeleteEventClick(eventCode, dispatch),
    handleEventItemClick: (eventCode) => handleEventItemClick(eventCode, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);
