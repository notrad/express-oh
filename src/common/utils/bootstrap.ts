import type { Express, Request, Response } from "express";
import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import { appConfig } from "../../config/config";
import { devCorsOptions } from "../constants/corsOptions";
import { dbConfig } from "../../config/config";
import type { Database } from "../../database/interfaces/Database";
import { databaseFactory } from "../../database/DatabaseFactory";

let db: Database;

export const initializeDatabase = async (): Promise<Database> => {
  const database = databaseFactory("postgres", dbConfig);
  await database.connect();
  db = database;
  return database;
};

export const getDatabase = (): Database => {
  if (!db) {
    throw new Error("Database not initialize");
  }
  return db;
};

export const bootStrapApplication = (app: Express): void => {
  app.use(
    compression({
      level: 9,
      threshold: 0,
      filter: (req: Request, res: Response) => {
        if (req.headers["x-no-compression"]) {
          return false;
        }

        return compression.filter(req, res);
      },
    }),
  );

  app.set(
    "views",
    path.join(__dirname, "../../", appConfig.viewEngine.viewsDir),
  );
  app.set("view engine", appConfig.viewEngine.engine);

  app.use(
    appConfig.staticFiles.route,
    express.static(path.join(__dirname, "../..", appConfig.staticFiles.dir)),
  );

  app.use(morgan("dev"));
  app.use(cors(devCorsOptions));
  app.use(express.json());
};
