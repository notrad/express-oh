import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/users';
import notFoundHandler from './middlewares/notFoundHandler';
import { devCorsOptions } from './common/constants/corsOptions';

const app = express();

app.use(morgan('dev'));

app.use(cors(devCorsOptions));

app.use(express.json());

app.use('/users', userRouter);

app.use('/{*catchAll}', notFoundHandler);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(500).json({
        message: 'Something went wrong'
    });
});

export default app;