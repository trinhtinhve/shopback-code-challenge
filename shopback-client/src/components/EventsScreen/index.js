import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Icon } from 'antd';

import CreateAndUpdateEventDialog from './CreateAndUpdateEventDialog'
import EventList from './EventList';
import './styles.css';

class EventsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openCreateAndUpdateEventDialog: false,
      eventNeedUpdate: null
    };
  }

  _renderCreateEventButton() {
    return (
      <div className="create-event-button">
        <RaisedButton label="Create your first event" primary={true} onClick={this._handleOpenCreateAndUpdateEventDialog.bind(this)} />
      </div>
    )
  }

  _renderEventList(events) {
    return (
      <div className="event-list">
        <EventList
          eventList={events}
          onEditEvent={this._onMenuEditEvent.bind(this)}
          onDeleteEvent={this.props.handleDeleteEventClick}
          onEventItemClick={this.props.handleEventItemClick}
        />
        <div className="create-new-event" onClick={this._handleOpenCreateAndUpdateEventDialog.bind(this)}>
          <Icon className="create-icon" type="plus-circle" style={{ fontSize: 40}}/>
          <span className="create-new-event-text" >Create new event</span>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.handleComponentDidMount();
  }

  _handleOpenCreateAndUpdateEventDialog() {
    this.setState({ openCreateAndUpdateEventDialog: true });
  };

  _cancelCreateEvent() {
    this.setState({ openCreateAndUpdateEventDialog: false, eventNeedUpdate: null });
  };

  _onMenuEditEvent(eventItem) {
    this.setState({
      openCreateAndUpdateEventDialog: true,
      eventNeedUpdate: eventItem
    });
  }

  _onCreateEventClick(eventName, eventCode, startTime, endTime) {
    this.setState({ openCreateAndUpdateEventDialog: false, eventNeedUpdate: null });
    this.props.handleCreateEventClick(eventName, eventCode, startTime, endTime);
  }

  _onEditEventClick(eventName, eventCode, startTime, endTime, oldEventCode) {
    this.setState({ openCreateAndUpdateEventDialog: false, eventNeedUpdate: null });
    this.props.handleEditEventClick(eventName, eventCode, startTime, endTime, oldEventCode);
  }

  render() {
    const { events } = this.props;
    const { openCreateAndUpdateEventDialog, eventNeedUpdate } = this.state;

    let eventListElement = this._renderEventList(events);
    let createEventButtonElement = this._renderCreateEventButton();

    return (
      !events ?
        <div>
          Loading Events
        </div>
        :
        <div className="event-screen">
          <CreateAndUpdateEventDialog
            isOpen={openCreateAndUpdateEventDialog}
            cancelCreateEvent={this._cancelCreateEvent.bind(this)}
            onCreateEventClick={this._onCreateEventClick.bind(this)}
            onEditEventClick={this._onEditEventClick.bind(this)}
            eventItem={eventNeedUpdate}
          />
          {events.length > 0 ? eventListElement : createEventButtonElement}
        </div>
    );
  }
}

export default EventsScreen;
