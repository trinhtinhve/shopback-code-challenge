const bcrypt = require('bcryptjs');

module.exports = {
  hash: async (value) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(value, salt);
  }
};
