import React from 'react';
import { Select } from 'antd';
import QuestionComposing from './QuestionComposing';
import QuestionList from './../materials/QuestionList';
import { Icon } from 'antd';

import './styles.css';

class QuestionsScreen extends React.Component {
  static SORT_BY_POPULAR = 'SORT_BY_POPULAR';
  static SORT_BY_CREATE = 'SORT_BY_CREATE';

  constructor(props) {
    super(props);

    this.state = {
      sortBy: QuestionsScreen.SORT_BY_CREATE,
    }
  }

  componentDidMount() {
    this.props.handleComponentDidMount();
  }

  _onSendClick(username, question) {
    this.props.makeQuestion(username, question);
  }

  _onSortQuestion(sortBy) {
    if (sortBy !== this.state.sortBy) {
      this.setState({ sortBy });
    }
  }

  render() {
    const { questions } = this.props;

    return (
      !questions ?
        <Icon className="loading" type="loading" style={{ fontSize: 200, margin: 'auto'}}/>
        :
        <div className="question-screen">
          <QuestionComposing onSendClick={this._onSendClick.bind(this)} />
          <div className="center">
            <span>{questions.length} question{questions.length > 1 ? 's' : ''}</span>
            <Select defaultValue={QuestionsScreen.SORT_BY_CREATE} style={{ width: 120 }} onChange={this._onSortQuestion.bind(this)}>
              <Select.Option value={QuestionsScreen.SORT_BY_POPULAR}>Popular</Select.Option>
              <Select.Option value={QuestionsScreen.SORT_BY_CREATE}>Create Time</Select.Option>
            </Select>
          </div>
          <QuestionList
            questions={questions}
            sortBy={this.state.sortBy}
            onLikeOrDislikeClick={this.props.handleLikeOrDislikeClick}
            forAdmin={false}
          />
        </div>
    );
  }
}

export default QuestionsScreen;
