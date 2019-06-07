class QuestionModel {
  constructor() {
    this.id = 0;
    this.username = '';
    this.question = '';
    this.likeCount = 0;
    this.dislikeCount = 0;
    this.isHighlight = false;
    this.createdTime = Date.now();
  }

  toJsonObject() {
    return {
      id: this.id,
      username: this.username,
      question: this.question,
      likeCount: this.likeCount,
      dislikeCount: this.dislikeCount,
      isHighlight: this.isHighlight,
      createdTime: this.createdTime
    };
  }
}

module.exports = QuestionModel;
