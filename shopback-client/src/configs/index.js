const env = process.env.NODE_ENV || 'development';
const configs = require(`./${env}`);

console.log(`configs: ${env}`);

module.exports = configs;
