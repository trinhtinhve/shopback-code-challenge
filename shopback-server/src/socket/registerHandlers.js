const commands = require('./CommandTypes');
const JoinRoomHandler = require('./socketHandlers/JoinRoomHandler');
const JoinRoomWithAdminRoleHandler = require('./socketHandlers/JoinRoomWithAdminRoleHandler');
const LeaveRoomHandler = require('./socketHandlers/LeaveRoomHandler');
const GetQuestionsHandler = require('./socketHandlers/GetQuestionsHandler');
const MakeQuestionHandler = require('./socketHandlers/MakeQuestionHandler');
const DeleteQuestionHandler = require('./socketHandlers/DeleteQuestionHandler');
const EditQuestionHandler = require('./socketHandlers/EditQuestionHandler');
const HighlightQuestionHandler = require('./socketHandlers/HighlightQuestionHandler');
const LikeOrDislikeHandler = require('./socketHandlers/LikeOrDislikeHandler');

module.exports = (socket) => {
  socket.on(commands.joinRoom, (params) => {
    const handler = new JoinRoomHandler(commands.joinRoom);
    handler.handleMessage(socket, params)
  });

  socket.on(commands.joinRoomWithAdminRole, (params) => {
    const handler = new JoinRoomWithAdminRoleHandler(commands.joinRoomWithAdminRole);
    handler.handleMessage(socket, params)
  });

  socket.on(commands.leaveRoom, (params) => {
    const handler = new LeaveRoomHandler(commands.leaveRoom);
    handler.handleMessage(socket, params)
  });

  socket.on(commands.getQuestions, (params) => {
    const handler = new GetQuestionsHandler(commands.getQuestions);
    handler.handleMessage(socket, params)
  });

  socket.on(commands.makeQuestion, (params) => {
    const handler = new MakeQuestionHandler(commands.makeQuestion);
    handler.handleMessage(socket, params)
  });

  socket.on(commands.deleteQuestion, (params) => {
    const handler = new DeleteQuestionHandler(commands.deleteQuestion);
    handler.handleMessage(socket, params)
  });

  socket.on(commands.editQuestion, (params) => {
    const handler = new EditQuestionHandler(commands.editQuestion);
    handler.handleMessage(socket, params)
  });

  socket.on(commands.highlightQuestion, (params) => {
    const handler = new HighlightQuestionHandler(commands.highlightQuestion);
    handler.handleMessage(socket, params)
  });

  socket.on(commands.likeOrDislike, (params) => {
    const handler = new LikeOrDislikeHandler(commands.likeOrDislike);
    handler.handleMessage(socket, params)
  });
};
