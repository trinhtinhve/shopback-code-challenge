/*
  todo: get config from server or file
 */

const host = 'http://localhost:6969';

let configs = {
  maxQuestionLength: 250,
  urlGetConnectionString: host + '/event/getServerConnectionStringByEventCode',
  urlSignUp: host + '/admin/sign-up',
  urlLogin: host + '/admin/login',
  urlGetEvents: host + '/event/get-all',
  urlCreateEvent: host + '/event/create',
  urlEditEvent: host + '/event/edit',
  urlDeleteEvent: host + '/event/delete',
};

export default configs;
