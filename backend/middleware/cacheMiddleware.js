// middleware/cacheMiddleware.js
const redis = require('../config/redis'); // Redis client

const cacheMiddleware = (key) => {
  return async (req, res, next) => {
    // Check if data is in Redis cache
    redis.get(key, (err, cachedData) => {
      if (err) {
        console.error('Redis error: ', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (cachedData) {
        return res.json(JSON.parse(cachedData)); // Return cached response
      }

      // Proceed to the next middleware or controller if no cache
      next();
    });
  };
};

module.exports = cacheMiddleware;
