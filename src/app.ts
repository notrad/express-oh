import express from "express";
import { notFoundHandler } from "./middlewares/notFoundHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger";
import { appConfig } from "./config/config";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { bootStrapApplication } from "./common/utils/bootstrap";

const createApp = () => {
  const app = express();

  bootStrapApplication(app);

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }),
  );

  app.use("/openai.json", (_req, res) => res.json(swaggerSpec));

  app.use(appConfig.apiPrefix, routes);

  app.use("/{*catchAll}", notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
