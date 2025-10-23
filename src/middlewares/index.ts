import type { Express } from "express";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import { errorHandler } from "./errorHandler";
import { notFoundHandler } from "./notFoundHandler";
import { devCorsOptions } from "../common/constants/corsOptions";

export const registerMiddlewares = (app: Express) => {
  app.use(compression());
  app.use(morgan("dev"));
  app.use(cors(devCorsOptions));
  app.use(express.json());

  app.use("*", notFoundHandler);
  app.use(errorHandler);
};
