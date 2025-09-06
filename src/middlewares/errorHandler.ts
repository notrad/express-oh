import type { Request, Response, NextFunction } from "express";
import type { ApiResponse, ApiError } from "../types/Api";

export const errorHandler = (
  err: ApiError & { statusCode?: number },
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;

  const response: ApiResponse = {
    status: "error",
    message: err.message || "Internal Server Error",
    errors: [
      {
        name: "error",
        code: statusCode.toString(),
        message: err.message,
      },
    ],
  };

  if (process.env.NODE_ENV === "development") {
    response.data = err.stack;
  }

  res.status(statusCode).json(response);
};
