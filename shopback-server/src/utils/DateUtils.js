const moment = require('moment');

module.exports = {
  formatDateTime: () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  },
};
