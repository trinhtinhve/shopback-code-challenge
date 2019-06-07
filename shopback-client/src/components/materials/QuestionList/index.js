import React from 'react';
import { List } from 'antd';

import QuestionItem from './QuestionItem';
import './styles.css';

class QuestionList extends React.Component {
  static SORT_BY_POPULAR = 'SORT_BY_POPULAR';
  static SORT_BY_CREATE = 'SORT_BY_CREATE';

  _handleSort(questions, sortBy) {
    if (sortBy === QuestionList.SORT_BY_POPULAR) {
      questions.sort((i1, i2) => (i2.likeCount - i1.likeCount));
    } else {
      questions.sort((i1, i2) => (i2.createdTime - i1.createdTime));
    }
  }

  render() {
    const { questions, sortBy, onLikeOrDislikeClick, onSaveQuestionClick, onHighlightClick, onRemoveClick, forAdmin } = this.props;

    this._handleSort(questions, sortBy);

    return (
      <List
        className="question-list"
        itemLayout="horizontal"
        dataSource={questions}
        renderItem={({ id, username, createdTime, question, likeCount, dislikeCount, isHighlight }) => (
          <QuestionItem
            id={id}
            username={username}
            createdTime={createdTime}
            question={question}
            likeCount={likeCount}
            dislikeCount={dislikeCount}
            isHighlight={isHighlight}
            onLikeOrDislikeClick={onLikeOrDislikeClick}
            onSaveClick={onSaveQuestionClick}
            onHighlightClick={onHighlightClick}
            onRemoveClick={onRemoveClick}
            forAdmin={forAdmin}
          />
        )}
      />
    );
  }
}

export default QuestionList;
