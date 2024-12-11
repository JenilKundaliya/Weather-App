import NodeCache from "node-cache";

class CacheService {
  private static instance: NodeCache;

  private constructor() {}

  public static getInstance(): NodeCache {
    if (!CacheService.instance) {
      CacheService.instance = new NodeCache({
        stdTTL: 600, // 10 minutes
        checkperiod: 120, // Check for expired keys every 2 minutes
      });
    }
    return CacheService.instance;
  }
}

export default CacheService;
