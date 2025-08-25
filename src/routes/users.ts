import { Router, Request, Response, NextFunction } from "express";
import { userModelRateLimit } from "../common/constants/rateLimitOptions";

const router = Router();

const validateUsers = (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({
            message: 'Name and email are required'
        });
    }
    next();
};

router.use(userModelRateLimit);

router.get('/', (req: Request, res: Response) => {
    res.json({ message: "Received GET" });
});

router.post('/', validateUsers, (req: Request, res: Response) => {
    const newUser = req.body;
    res.status(201).json({
        message: 'Received POST',
        data: newUser
    });
});

router.put('/:id', validateUsers, (req: Request, res: Response) => {
    const userId = req.params.id;
    const updatedFields = req.body;
    res.json({
        message: `Received PATCH for ${userId}`,
        data: updatedFields
    });
});

router.patch('/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    const updatedFields = req.body;
    res.json({ message: `Received a PATCH HTTP method for user ${userId}`, data: updatedFields });
});

router.delete('/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    res.json({
        message: `Received a DELETE for ${userId}`
    });
});

export default router;