import { Router, Request, Response } from "express";

const router = Router();

/**
 * @openapi
 * /health:
 *  get:
 *      summary: Health check endpoint
 *      responses:
 *          200:
 *              description: OK
 */
router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

router.get('/detailed', (req: Request, res: Response) => {
    try {
        const healthCheck = {
            status: 'UP',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV,
            version: process.env.npm_package_version,
            services: {
                api: 'UP',
                // database: await checkDatabase(),
                // redis: await checkRedis(),
                // externalApi: await checkExternalService()
            },
            system: {
                memory: {
                    used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
                    total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100,
                },
                pid: process.pid,
                platform: process.platform,
                nodeVersion: process.version
            }
        };

        const servicesDown = Object.values(healthCheck.services).some(service => service === 'DOWN');

        if (servicesDown) {
            healthCheck.status = 'DEGRADED';
            return res.status(503).json(healthCheck);
        }

        res.status(200).json(healthCheck);
    } catch (error) {
        res.status(503).json({
            status: 'DOWN',
            timestamp: new Date().toISOString(),
            error: 'Health check failed'
        });
    }
});

export default router;