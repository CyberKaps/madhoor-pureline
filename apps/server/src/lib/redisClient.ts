import Redis from "ioredis";

// Simple in-memory mock to avoid crashing if Redis is not running
class MockRedis {
  private store: Map<string, string> = new Map();

  constructor() {
    console.warn("Using Mock Redis Client");
  }

  async get(key: string) {
    return this.store.get(key) || null;
  }

  async set(key: string, value: string, ...args: any[]) {
    this.store.set(key, value);
    return "OK";
  }

  on(event: string, callback: any) {
    // No-op
  }
}

export const redisClient = new MockRedis() as unknown as Redis;
