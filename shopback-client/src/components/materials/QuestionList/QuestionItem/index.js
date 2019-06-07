import React from 'react';
import { Icon, Button } from 'antd';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './styles.css';

class QuestionItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditQuestion: false,
      questionEditing: props.question,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ questionEditing: nextProps.question });
  }

  _renderUserPlace(username, createdTime) {
    const time = new Date(createdTime);
    return (
      <div className="user-place">
        <div className="avatar"><Icon className="user-icon" type="user" /></div>
        <div className="user-name">
          {!username || username === '' ? 'Anonymous' : username}
        </div>
        <div className="created-time">
          {time.toLocaleString()}
        </div>
      </div>
    );
  }

  _renderLikeDislikeCount(likeCount, dislikeCount) {
    return (
      <div className="like-dislike">
        <Button.Group>
          <Button type="primary" onClick={this._onLikeClick.bind(this)}>
            <Icon type="like" />
            {" "}{likeCount ? likeCount : 0}
          </Button>
          <Button type="primary" onClick={this._onDislikeClick.bind(this)}>
            {dislikeCount ? dislikeCount : 0}{" "}
            <Icon type="dislike" />
          </Button>
        </Button.Group>
      </div>
    );
  }

  _renderQuestion(id) {
    const { showEditQuestion, questionEditing } = this.state;
    let styleOfEditTextField = { position: 'absolute', top: 0, left:0, right: 0, height: 'auto', cursor: 'default'};
    styleOfEditTextField.bottom = showEditQuestion ? 50 : 0;
    styleOfEditTextField.background = showEditQuestion ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)'

    return (
      <div className={ showEditQuestion ? "edit-text" : "question-content"}>
        <TextField
          id={"question-text-" + id}
          value={questionEditing}
          fullWidth
          rows={4}
          style={styleOfEditTextField}
          onChange={this._onChangeQuestion.bind(this)}
          disabled={!showEditQuestion}
          inputStyle={{ color: 'black' }}
        />
        { showEditQuestion &&
        <div className="edit-action">
          <Icon className="close-edit" style={{ fontSize: 32, marginRight: 5 }} type="close" onClick={this._onCloseEditClick.bind(this)}/>
          <RaisedButton label="Save" primary={true} onClick={this._onSaveClick.bind(this)}/>
        </div>
        }
      </div>
    )
  }

  _renderIconMenu() {
    const styleOfIcon = {
        position: 'absolute',
        right: 0,
        top: 12
    };

    return (
      <IconMenu
        className="icon-menu"
        style={styleOfIcon}
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Edit" onClick={this._onEditClick.bind(this)} />
        <MenuItem primaryText="Remove" onClick={this._onRemoveClick.bind(this)} />
      </IconMenu>
    )
  }

  _renderHighLight(isHighlight) {
    return (
      <div className="high-light">
      <Icon className="high-light-icon" type={isHighlight ? 'down-circle-o' : 'up-circle-o'} onClick={this._onHighLightClick.bind(this)}/>
      </div>
    )
  }

  _onLikeClick() {
    this.props.onLikeOrDislikeClick(this.props.id, 1);
  }

  _onDislikeClick() {
    this.props.onLikeOrDislikeClick(this.props.id, -1);
  }

  _onEditClick() {
    this.setState({ showEditQuestion: true });
  }

  _onRemoveClick() {
    this.props.onRemoveClick(this.props.id);
  }

  _onCloseEditClick() {
    this.setState({ showEditQuestion: false, questionEditing: this.props.question });
  }

  _onSaveClick() {
    this.setState({ showEditQuestion: false });

    if (this.state.questionEditing === '') {
      this.setState({ questionEditing: this.props.question });
      return;
    }

    this.props.onSaveClick(this.props.id, this.state.questionEditing);
  }

  _onChangeQuestion(e) {
    this.setState({ questionEditing: e.target.value });
  }

  _onHighLightClick() {
    this.props.onHighlightClick(this.props.id, this.props.isHighlight);
  }

  render() {
    const { id, username, createdTime, likeCount, dislikeCount, isHighlight, forAdmin } = this.props;
    const { showEditQuestion } = this.state;
    const allowEditClassName = showEditQuestion ? ' allow-edit' : '';
    const isHighLightClassName = isHighlight ? ' high-light' : '';

    return (
      <div className={"question-item" + allowEditClassName + isHighLightClassName}>
        {this._renderUserPlace(username, createdTime)}
        {!forAdmin && this._renderLikeDislikeCount(likeCount, dislikeCount)}
        {this._renderQuestion(id)}
        {forAdmin && this._renderIconMenu()}
        {forAdmin && this._renderHighLight(isHighlight)}
      </div>
    );
  }
}

export default QuestionItem;
