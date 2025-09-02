import { Router } from "express";
import userRouter from "./users";
import healthRouter from "./health";

const router = Router();

router.use("/health", healthRouter);
router.use("/users", userRouter);

export const routes = router;
