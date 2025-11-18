import type { Request, Response } from "express";
import { createUser, findUserById } from "../services/userServiceV2";
import type { CreateUserDto, UpdateUserDto, UserResponse } from "../types/User";
import type { ApiResponse } from "../types/Api";

export const getUserV2 = async (req: Request, res: Response) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    const response: ApiResponse<UserResponse> = {
      status: "success",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const postUserV2 = async (req: Request, res: Response) => {
  const user: CreateUserDto = req.body;
  const createdUser = await createUser(user);
};
