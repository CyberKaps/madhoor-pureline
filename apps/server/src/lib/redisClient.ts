
import Redis from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export { redisClient };


// docker run -d --name redis -p 6379:6379 redis
