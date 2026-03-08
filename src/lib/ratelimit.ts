import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// LLM calls — most expensive, tightest limit
export const processLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "1 h"),
  prefix: "rl:process",
});

// Document record creation (one per upload)
export const uploadLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 h"),
  prefix: "rl:upload",
});

// Account deletion — belt-and-suspenders
export const accountLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  prefix: "rl:account",
});
