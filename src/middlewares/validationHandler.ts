import type { Request, Response, NextFunction } from "express";
import type { Schema } from "joi";

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    next();
  };
};
