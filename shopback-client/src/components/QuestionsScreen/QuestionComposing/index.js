import React from 'react';
import { Layout, Input, Icon, Button } from 'antd';
import { TextField } from 'material-ui';

import configs from './../../../configs';
import './styles.css';

class QuestionComposing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowFooter: false,
      username: '',
      question: '',
      questionLength: configs.maxQuestionLength
    };
  }

  _onChangeName(e) {
    this.setState({ username: e.target.value });
  }

  _onChangeQuestion(e) {
    const question = e.target.value;

    let questionLength = configs.maxQuestionLength - question.length;
    if (questionLength < 0) {
      return;
    }

    this.setState({ questionLength, question });
  }

  _onFocusTextArea(e) {
    this.setState({ isShowFooter: true })
  }

  _onBlurTextArea(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      this.setState({ isShowFooter: false })
    }
    
  }

  _onSendClick() {
    let { username, question } = this.state;
    if (question === '') {
      alert('question can not empty!');
      return;
    }

    this.props.onSendClick(username, question);
    this.setState({ question: '' });
  }

  _renderContent() {
    const { question, isShowFooter } = this.state;

    return (
      <Layout.Content className="content-question">
        <TextField
          className="text-field-question"
          hintText="Type your question"
          multiLine={true}
          rows={isShowFooter ? 4 : 2}
          value={question}
          onChange={this._onChangeQuestion.bind(this)}
          textareaStyle={{height: isShowFooter ? 96 : 48}}
          fullWidth
        />
        <span className="content-question-length">{this.state.questionLength}</span>
      </Layout.Content>
    );
  }

  _renderFooter() {
    const { username } = this.state;

    return (
      <Layout.Footer className="question-composing-footer">
        <Input
          placeholder="Your name (option)"
          prefix={<Icon type="user" />}
          suffix={<Button type="primary" onClick={this._onSendClick.bind(this)}>SEND</Button>}
          value={username}
          onChange={this._onChangeName.bind(this)}
        />
      </Layout.Footer>
    );
  }

  render() {
    let { isShowFooter } = this.state;
    return (
      <div className="question-composing"
        onFocus={this._onFocusTextArea.bind(this)}
        onBlurCapture={this._onBlurTextArea.bind(this)}
      >
        <Layout>
          {this._renderContent()}
          {isShowFooter && this._renderFooter()}
        </Layout>
      </div>
    );
  }
}

export default QuestionComposing;
