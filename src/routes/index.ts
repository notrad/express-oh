import { Router } from "express";
import userRouter from "./usersRoutes";
import healthRouter from "./healthRoutes";
import homeRouter from "./homeRoutes";

const router = Router();

router.use("/", homeRouter);
router.use("/health", healthRouter);
router.use("/users", userRouter);

export const routes = router;
