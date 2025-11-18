import type { Request, Response } from "express";
import { findUserById } from "../services/userServiceV2";
import type { CreateUserDto, UpdateUserDto } from "../types/User";

export const getUserV2 = async (req: Request, res: Response) => {
  const user = await findUserById(req.params.id);
  if (!user) return res.status(404).json({ messsage: "User not found" });
  res.json(user);
};
