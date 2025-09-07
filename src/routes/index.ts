import { Router } from "express";
import userRouter from "./users";
import healthRouter from "./health";
import homeRouter from "./home";

const router = Router();

router.use("/", homeRouter);
router.use("/health", healthRouter);
router.use("/users", userRouter);

export const routes = router;
