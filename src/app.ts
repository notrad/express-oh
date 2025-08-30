import type { Request, Response } from "express";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/users";
import healthRouter from "./routes/health";
import notFoundHandler from "./middlewares/notFoundHandler";
import { devCorsOptions } from "./common/constants/corsOptions";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger";

const app = express();

app.use(morgan("dev"));

app.use(cors(devCorsOptions));

app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  }),
);

app.use("/openapi.json", (_req, res) => res.json(swaggerSpec));

app.use("/health", healthRouter);

app.use("/users", userRouter);

app.use("/{*catchAll}", notFoundHandler);

app.use((err: Error, req: Request, res: Response) => {
  console.log(err.stack);
  res.status(500).json({
    message: "Something went wrong",
  });
});

export default app;
