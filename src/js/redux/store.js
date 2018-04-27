process.env.NODE_ENV === 'production' ? (module.exports = require('./store.prod')) : (module.exports = require('./store.dev'));
