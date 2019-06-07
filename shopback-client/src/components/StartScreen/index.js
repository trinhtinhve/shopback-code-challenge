import React from 'react';
import { Button } from 'antd';
import './styles.css';

import InputEventCode from './InputEventCode';

class StartScreen extends React.Component {
  _onCreateEventClick() {
    this.props.handleCreateEventClick();
  }

  _renderCreateEventButton() {
    return (
      <Button className="create-btn" icon="plus" onClick={this._onCreateEventClick.bind(this)}>
        CREATE EVENT
      </Button>
    );
  }

  render() {
    const { handleJoinEventClick } = this.props;

    return (
      <div className="start-screen">
        <InputEventCode handleJoinEventClick={handleJoinEventClick} />
        <div className="middle">
          <span className="or">OR</span>
        </div>
        {this._renderCreateEventButton()}
      </div>
    );
  }
}

export default StartScreen;
