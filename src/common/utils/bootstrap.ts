import type { Express } from "express";
import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import { appConfig } from "../../config/configuration";
import { devCorsOptions } from "../constants/corsOptions";

export const bootStrapApplication = (app: Express): void => {
  app.set("views", path.join(__dirname, "..", appConfig.viewEngine.viewsDir));
  app.set("view engine", appConfig.viewEngine.engine);

  app.use(
    appConfig.staticFiles.route,
    express.static(path.join(__dirname, "..", appConfig.staticFiles.dir)),
  );

  app.use(morgan("dev"));
  app.use(cors(devCorsOptions));
  app.use(express.json());
};
