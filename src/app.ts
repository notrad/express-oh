import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import { devCorsOptions } from "./common/constants/corsOptions";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger";
import { config } from "./config/config";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const createApp = () => {
  const app = express();

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");

  app.use("static", express.static(path.join(__dirname, "public")));

  app.use(morgan("dev"));
  app.use(cors(devCorsOptions));
  app.use(express.json());

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }),
  );

  app.use("/openai.json", (_req, res) => res.json(swaggerSpec));

  app.use(config.apiPrefix, routes);

  app.use("/{*catchAll}", notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
