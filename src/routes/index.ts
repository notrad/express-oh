import { Router } from "express";
import userRouter from "./usersRoutes";
import healthRouter from "./healthRoutes";
import homeRouter from "./homeRoutes";
import authRouter from "./authRoutes";
import { authenticate } from "../middlewares/authHandler";

const router = Router();

router.use("/", homeRouter);
router.use("/auth", authRouter);
router.use("/health", healthRouter);
router.use("/users", authenticate, userRouter);

export const routes = router;
