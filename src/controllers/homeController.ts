import type { Request, Response } from "express";
import type { HealthCheckResponse } from "../types/Health";

export function getHome(req: Request, res: Response): void {
  const health: HealthCheckResponse = {
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };

  res.render("home", {
    title: "Express, Oh!",
    health,
  });
}
