const env = process.env.NODE_ENV || 'development';
const configureStore = require(`./${env}`);

console.log(`configureStore: ${env}`);

module.exports = configureStore;
