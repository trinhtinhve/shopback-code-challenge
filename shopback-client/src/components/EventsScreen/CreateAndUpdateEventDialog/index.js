import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class CreateAndUpdateEventDialog extends React.Component {
  constructor(props) {
    super(props);

    console.log('props.eventItem', props.eventItem);

    this.state = {
      eventName: '',
      eventCode: '',
      dateFrom: {},
      dateTo: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.eventItem) {
      this.setState({
        eventName: nextProps.eventItem.eventName,
        eventCode: nextProps.eventItem.eventCode,
        dateFrom: new Date(nextProps.eventItem.startTime),
        dateTo: new Date(nextProps.eventItem.endTime),
      });
    } else {
      let today = new Date();
      let nextDay = new Date(today);
      nextDay.setDate(today.getDate() + 1);

      this.setState({
        eventName: '',
        eventCode: '',
        dateFrom: today,
        dateTo: nextDay,
      });
    }
  }

  _onChangeEventName(e) {
    this.setState({ eventName: e.target.value });
  }

  _onChangeDateFrom(e, date) {
    this.setState({ dateFrom: date })
  }

  _onChangeDateTo(e, date) {
    this.setState({ dateTo: date })
  }

  _onChangeEventCode(e) {
    this.setState({ eventCode: e.target.value })
  }

  _onCancelCreateEvent() {
    this.props.cancelCreateEvent();
  }

  _onCreateOEditEvent() {
    const { eventName, eventCode, dateFrom, dateTo } = this.state;
    const { onCreateEventClick, onEditEventClick, eventItem } = this.props;

    if (!eventItem) onCreateEventClick(eventName, eventCode, dateFrom.getTime(), dateTo.getTime());
    else onEditEventClick(eventName, eventCode, dateFrom.getTime(), dateTo.getTime(), eventItem.eventCode);
  }

  render() {
    const { eventName, eventCode, dateFrom, dateTo } = this.state;
    const { isOpen, eventItem } = this.props;

    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this._onCancelCreateEvent.bind(this)} />,
      <FlatButton label={eventItem ? 'Edit' : 'Create'} primary={true} keyboardFocused={true} onClick={this._onCreateOEditEvent.bind(this)} />,
    ];

    return (
      <Dialog title="Create new event" actions={actions} modal={false}
              open={isOpen}
              onRequestClose={this._onCancelCreateEvent.bind(this)}
      >
        <div className="event-creation-content">
          <TextField hintText="Event Name" defaultValue={eventName} onChange={this._onChangeEventName.bind(this)}/>
          <DatePicker hintText="Date from" defaultDate={dateFrom} onChange={this._onChangeDateFrom.bind(this)}/>
          <DatePicker hintText="Date to" defaultDate={dateTo} onChange={this._onChangeDateTo.bind(this)}/>
          <TextField hintText="Event Code" defaultValue={eventCode} onChange={this._onChangeEventCode.bind(this)}/>
        </div>
      </Dialog>
    )
  }
}

export default CreateAndUpdateEventDialog;
