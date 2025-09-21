import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { LoginDto, LoginResponse, JwtPayload } from "../types/Auth";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginDto = req.body;

    // TODO: Replace with actual user lookup from database
    const mockUser = {
      id: "1",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
      roles: ["admin"] as const,
    };

    if (
      email !== mockUser.email ||
      !(await bcrypt.compare(password, mockUser.password))
    ) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    const payload: JwtPayload = {
      userId: mockUser.id,
      email: mockUser.email,
      roles: mockUser.roles,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const response: LoginResponse = {
      token,
      user: {
        id: mockUser.id,
        email: mockUser.email,
        roles: mockUser.roles,
      },
    };

    res.json({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Login failed",
    });
  }
};
