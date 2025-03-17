const { rateLimit } = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const Redis = require('ioredis');
const { AuthError } = require('../controllers/errorController');

const redisClient = new Redis({
  host: '127.0.0.1',
  port: 6379,
});
redisClient.on('connect', () => {
  console.log('✅ Connected to Redis!');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
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
      res.status(429).json({
        success: false,
        error: AuthError.MESSAGES.REQUESTLIMIT,
      });
    },
  });
}

module.exports = createRateLimiter;
