const { LRUCache } = require("lru-cache");

// Create a cache instance with configurable options
const createCache = (options = {}) => {
  const defaultOptions = {
    max: 1000,
    maxSize: 1000,
    sizeCalculation: () => 1, // Every entry counts as 1
    ttl: 1000 * 60 * 120, // 120 minutes TTL by default
    ttlAutopurge: true,
  };

  return new LRUCache({
    ...defaultOptions,
    ...options,
  });
};

// Create a default cache instance
const defaultCache = createCache();

module.exports = {
  cache: defaultCache,
  createCache
};
