import type { RateLimitRequestHandler } from "express-rate-limit";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";

export const userModelRateLimit: RateLimitRequestHandler = rateLimit({
    windowMs: 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: 'Too many requests, please try again later'
    },
    skip: (req, _res) => req.method === 'OPTIONS',
    keyGenerator: (req, _res) => {
        const apiKey = req.header('x-api-key');
        const userIpAddress: string = req.ip ? req.ip : "";
        return apiKey || ipKeyGenerator(userIpAddress);
    }
});
