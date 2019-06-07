import React from 'react';
import { Input, Button } from 'antd';
import './styles.css';

class InputEventCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventCode: ''
    };
  }

  _onChangeEventCode(e) {
    this.setState({ eventCode: e.target.value });
  }

  _onJoinClick() {
    this.props.handleJoinEventClick(this.state.eventCode);
  }

  render() {
    const { eventCode } = this.state;

    return (
      <div className="input-event-code">
        <Input
          placeholder="Enter event code"
          prefix={<div>#</div>}
          suffix={<Button type="primary" onClick={this._onJoinClick.bind(this)}>JOIN</Button>}
          value={eventCode}
          onChange={this._onChangeEventCode.bind(this)}
        />
      </div>
    );
  }
}

export default InputEventCode;
