const { rateLimit } = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const Redis = require('ioredis');
const { AuthError } = require('../controllers/errorController');
const logger = require('../utils/logger');

const redisClient = new Redis({
  host: 'redis',
  port: 6379,
});
redisClient.on('connect', () => {
  logger.info('Connected to Redis!')
});

redisClient.on('error', (err) => {
  logger.error(' Redis connection error:', err);
});

function createRateLimiter(window = 1 * 60 * 1000, max = 1) {
  return rateLimit({
    windowMs: window,
    standardHeaders: true,
    legacyHeaders: false,
    max: max,
    store: new RedisStore({
      sendCommand: async (...args) => {
        const result = await redisClient.call(...args);
        return result;
      },
    }),

    handler: (req, res, next) => {
      logger.error(`${req.url} ${req.method} api call limit exceeded`)
      res.status(429).json({
        success: false,
        error: AuthError.MESSAGES.REQUESTLIMIT,
      });
    },
  });
}

module.exports = createRateLimiter;
