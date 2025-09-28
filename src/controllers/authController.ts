import type { Request, Response } from "express";
import { login } from "../services/authService";
import type { LoginDto } from "../types/Auth";

export const logIn = async (req: Request, res: Response) => {
  try {
    const credentials: LoginDto = req.body;
    const response = await login(credentials);

    res.json({
      status: "success",
      data: response,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login Failed";
    res.status(401).json({
      status: "error",
      message,
    });
  }
};
