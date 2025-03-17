const logger = require('../utils/logger');

function requestLogger(req, res, next) {
  if (!req.url.startsWith('/api')) return next();
  const { method, url, headers, ip } = req;
  const user = req.user ? req.user.id : 'guest';
  const userAgent = headers['user-agent'];
  logger.info(`${user} ${url} ${method}`);
  next();
}

module.exports = requestLogger;
