import express, { NextFunction, Request, Response} from 'express';
import userRouter from './routes/users';

const app = express();

app.use(express.json());

app.use('/users', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(500).json({
        message: 'Something went wrong'
    });
});

export default app;