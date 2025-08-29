import type { Request, Response } from 'express';

const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        error: 'Not Found',
        timestamp: new Date().toISOString()
    });
};

export default notFoundHandler;