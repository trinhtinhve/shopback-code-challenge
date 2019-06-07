module.exports = {
  SUCCESS: {
    statusCode: 200,
    message: 'Success'
  },

  SIGN_UP_LOCAL: {
    ADMIN_EXIST: {
      statusCode: 1001,
      message: 'Admin is exist'
    }
  },

  LOGIN_LOCAL: {
    ADMIN_NAME_INVALID: {
      statusCode: 1011,
      message: 'Email is invalid'
    },
    ADMIN_PASS_INVALID: {
      statusCode: 1012,
      message: 'Password is invalid'
    }
  },

  EVENT: {
    CODE_INVALID : {
      statusCode: 1100,
      message: 'Event Code is invalid'
    },
    CODE_EXIST: {
      statusCode: 1101,
      message: 'Event Code is exist'
    },
    PERIOD_TIME_INVALID: {
      statusCode: 1102,
      message: 'Period time invalid'
    },
    NOT_EXIST: {
      statusCode: 1103,
      message: 'Event not exist'
    }
  }

};
