import { Redis } from '@upstash/redis'


export const db = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || "fallback",
    token: process.env.UPSTASH_REDIS_REST_TOKEN|| "fallback",
})
