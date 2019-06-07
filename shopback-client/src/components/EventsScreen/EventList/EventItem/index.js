import React from 'react';
import './styles.css';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class EventItem extends React.Component {
  _onEventItemClick() {
    this.props.onEventItemClick(this.props.eventItem.eventCode);
  }

  _renderIconMenu() {
    const styleOfIcon = {
        position: 'absolute',
        right: 0,
        top: 0
    };

    return (
      <IconMenu
        className="icon-menu"
        style={styleOfIcon}
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Edit" onClick={this._onEditClick.bind(this)}/>
        <MenuItem primaryText="Remove" onClick={this._onDeleteClick.bind(this)} />
      </IconMenu>
    )
  }

  _onEditClick() {
      this.props.onEditEvent(this.props.eventItem);
  }

  _onDeleteClick() {
    this.props.onDeleteEvent(this.props.eventItem.eventCode);
  }

  render() {
    let { eventItem } = this.props;
    let { eventName, eventCode, startTime, endTime } = eventItem;

    const dateFrom = new Date(startTime);
    const dateTo = new Date(endTime);

    return (
      <div className="event-item">
        <div className="event-info" onClick={this._onEventItemClick.bind(this)}>
          <div className="event-name">{eventName ? eventName : 'Anonymous'}</div>
          <div className="event-code">#{eventCode ? eventCode : '000000'}</div>
          <div className="date-from">{dateFrom.toLocaleString()}</div>
          <div className="date-to">{dateTo.toLocaleString()}</div>
        </div>
        {this._renderIconMenu()}
      </div>
    )
  }
}

export default EventItem;
