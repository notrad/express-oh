import { Router } from "express";
import { HomeController } from "../controllers/homeController";

const router = Router();

router.get("/", HomeController.getHome);

export default router;
