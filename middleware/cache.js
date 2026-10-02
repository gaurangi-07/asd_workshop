// Simple in-memory cache store
// Each entry: { value, createdAt }
const cache = {};

const TTL_MS = 60 * 1000; // 1 minute

function isCacheValid(entry) {
  return Date.now() - entry.createdAt < TTL_MS;
}

// Middleware: check cache before hitting controller
function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
  const entry = cache[key];

  if (entry && isCacheValid(entry)) {
    res.setHeader('X-Cache', 'HIT');
    res.setHeader('X-Cache-Created-At', new Date(entry.createdAt).toISOString());
    return res.json(entry.value);
  }

  // MISS — attach a helper so the controller can populate the cache
  res.setHeader('X-Cache', 'MISS');
  res.populateCache = (data) => {
    cache[key] = { value: data, createdAt: Date.now() };
  };

  next();
}

// Invalidate all cache entries (call after write operations)
function invalidateCache() {
  Object.keys(cache).forEach(key => delete cache[key]);
}

module.exports = { cacheMiddleware, invalidateCache };
