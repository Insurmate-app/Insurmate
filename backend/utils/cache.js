const { LRUCache } = require("lru-cache");

const cache = new LRUCache({
  max: 1000,
  maxSize: 1000,
  sizeCalculation: () => 1, // Every entry counts as 1
  ttl: 1000 * 60 * 120, // 120 minutes TTL
  ttlAutopurge: true,
});

module.exports = cache;
