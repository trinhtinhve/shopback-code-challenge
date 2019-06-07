const env = process.env.NODE_ENV || 'development';
const config = require(`./${env}`);

console.log(`Server environment: ${env}`);

module.exports = config;
