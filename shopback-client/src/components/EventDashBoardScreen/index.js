import React from 'react';
import { Icon } from 'antd';
import QuestionList from './../materials/QuestionList';

import './styles.css'

class EventDashBoardScreen extends React.Component {
  componentDidMount() {
    this.props.handleComponentDidMount();
  }

  _renderDashBoardHeader(event) {
    const dateFrom = new Date(event.startTime);
    const dateTo = new Date(event.endTime);

    return (
      <div className="dashboard-header">
        <div className="back"><Icon className="back-icon" type="left" style={{ fontSize: 40}} onClick={this.props.handleBackClick} /></div>
        <div className="event-name">{event.eventName}</div>
        <div className="event-date">{dateFrom.toLocaleString() + ':' + dateTo.toLocaleString()}</div>
        <div className="event-code">#{event.eventCode}</div>
        <div className="setting"> <Icon className="setting-icon" type="setting" style={{ fontSize: 40}}/> </div>
      </div>
    );
  }

  _renderDashBoardContent(questions) {
    return (
      <div className="dashboard-content">
        <QuestionList
          questions={questions}
          onSaveQuestionClick={this.props.handleSaveQuestion}
          onHighlightClick={this._onHighlightClick.bind(this)}
          onRemoveClick={this.props.handleRemoveClick.bind(this)}
          forAdmin={true} />
      </div>
    )
  }

  _onHighlightClick(questionId, isHighlight) {
    let { event } = this.props;
    if (!isHighlight && event.highlightCount >= 3) {
      alert('HighlightCount is max');
      return;
    }

    this.props.handleHighlight(questionId);
  }

  render() {
    let { questions, event } = this.props;

    return (
      !questions ? 
        <Icon className="loading" type="loading" style={{ fontSize: 200, margin: 'auto'}}/>
        :
        <div className="dashboard">
          {this._renderDashBoardHeader(event)}
          {this._renderDashBoardContent(questions)}
        </div>
    );
  }

}

export default EventDashBoardScreen;
