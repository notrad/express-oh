import { Router } from "express";
import userRouter from "./usersRoutes";
import userRouterV2 from "./usersRoutesV2";
import healthRouter from "./healthRoutes";
import homeRouter from "./homeRoutes";
import authRouter from "./authRoutes";
import { authenticate } from "../middlewares/authHandler";

const router = Router();

router.use("/", homeRouter);
router.use("/auth", authRouter);
router.use("/health", healthRouter);
router.use("/v1/users", authenticate, userRouter);
router.use("/v2/users", authenticate, userRouterV2);

export const routes = router;
