import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

export const userModelRateLimit: RateLimitRequestHandler = rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: 'Too many requests, please try again later'
    },
    skip: (req, _res) => req.method === 'OPTIONS',
    keyGenerator: (req, _res) => {
        const userId = (req as any).user?.id;
        const apiKey = req.header('x-api-key');
        return userId || apiKey || req.ip;
    }
});
