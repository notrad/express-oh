import { Router } from "express";
import { getHealth, getHealthDetailed } from "../controllers/healthController";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Health
 *     description: Service health and diagnostics
 */

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Basic health check
 *     description: Returns the liveness status, current timestamp, and process uptime.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: UP
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-08-27T13:45:12.345Z
 *                 uptime:
 *                   type: number
 *                   format: float
 *                   description: Uptime in seconds
 *                   example: 1234.56
 */
router.get("/", getHealth);

/**
 * @openapi
 * /health/detailed:
 *   get:
 *     summary: Detailed health check
 *     description: Returns detailed system and service information. Responds with 503 if any dependency is down.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Detailed health information when all dependencies are up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [UP, DEGRADED]
 *                   example: UP
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2025-08-27T13:45:12.345Z
 *                 uptime:
 *                   type: number
 *                   format: float
 *                   example: 1234.56
 *                 environment:
 *                   type: string
 *                   nullable: true
 *                   example: development
 *                 version:
 *                   type: string
 *                   nullable: true
 *                   example: 1.0.0
 *                 services:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *                     enum: [UP, DOWN]
 *                   example:
 *                     api: UP
 *                 system:
 *                   type: object
 *                   properties:
 *                     memory:
 *                       type: object
 *                       properties:
 *                         used:
 *                           type: number
 *                           format: float
 *                           description: Used heap in MB
 *                           example: 25.67
 *                         total:
 *                           type: number
 *                           format: float
 *                           description: Total heap in MB
 *                           example: 50.23
 *                     pid:
 *                       type: integer
 *                       example: 12345
 *                     platform:
 *                       type: string
 *                       example: linux
 *                     nodeVersion:
 *                       type: string
 *                       example: v20.11.1
 *       503:
 *         description: One or more dependencies are down, or an error occurred during health evaluation
 *         content:
 *           application/json:
 *             oneOf:
 *               - type: object
 *                 description: Degraded state when a dependency is DOWN
 *                 properties:
 *                   status:
 *                     type: string
 *                     enum: [DEGRADED]
 *                     example: DEGRADED
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   uptime:
 *                     type: number
 *                     format: float
 *                   environment:
 *                     type: string
 *                     nullable: true
 *                   version:
 *                     type: string
 *                     nullable: true
 *                   services:
 *                     type: object
 *                     additionalProperties:
 *                       type: string
 *                       enum: [UP, DOWN]
 *                     example:
 *                       api: UP
 *                       database: DOWN
 *                   system:
 *                     type: object
 *                     properties:
 *                       memory:
 *                         type: object
 *                         properties:
 *                           used:
 *                             type: number
 *                           total:
 *                             type: number
 *                       pid:
 *                         type: integer
 *                       platform:
 *                         type: string
 *                       nodeVersion:
 *                         type: string
 *               - type: object
 *                 description: Failure when health evaluation throws an error
 *                 properties:
 *                   status:
 *                     type: string
 *                     enum: [DOWN]
 *                     example: DOWN
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   error:
 *                     type: string
 *                     example: Health check failed
 */
router.get("/detailed", getHealthDetailed);

export default router;
