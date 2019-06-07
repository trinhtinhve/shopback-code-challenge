import React from 'react';
import { List } from 'antd';

import EventItem from './EventItem';

const EventList = (props) => {
  let { eventList, onEditEvent, onDeleteEvent, onEventItemClick } = props;

  return (
    <List
      itemLayout="horizontal"
      dataSource={eventList}
      renderItem={item =>
        <EventItem
          eventItem={item}
          onEditEvent={onEditEvent}
          onDeleteEvent={onDeleteEvent}
          onEventItemClick={onEventItemClick}
        />}
    />
  )
};

export default EventList;
