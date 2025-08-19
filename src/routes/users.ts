import { Router, Request, Response } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: "Received GET" });
});

router.post('/', (req: Request, res: Response) => {
    const newUser = req.body;
    res.status(201).json({
        message: 'Received POST',
        data: newUser
    });
});

router.put('/:id', (req: Request, res: Response) => {
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