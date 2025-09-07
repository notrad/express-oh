import type { Request, Response } from "express";
import { Router } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const health = {
    status: "UP",
    uptime: process.uptime(),
  };

  res.render("home", {
    title: "Express, Oh!",
    health,
  });
});

export default router;
