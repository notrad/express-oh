import type { Request, Response } from "express";

export function getUser(req: Request, res: Response) {
  const health = {
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };

  res.render("home", {
    title: "Express, Oh!",
    health,
  });
}
