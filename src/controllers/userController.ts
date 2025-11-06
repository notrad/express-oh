import type { Request, Response } from "express";
import type { CreateUserDto, UserResponse } from "../types/User";
import type { ApiResponse } from "../types/Api";
import * as userService from "../services/userService";

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userService.findUserById(userId);

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
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const postUser = (req: Request, res: Response) => {
  const newUser: CreateUserDto = req.body;
  const response: ApiResponse<UserResponse> = {
    status: "success",
    data: {
      id: "1",
      ...newUser,
    },
  };

  res.json(response);
};

export const putUser = (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const updatedFields = req.body;
  res.json({
    message: `Received PATCH for ${userId}`,
    data: updatedFields,
  });
};

export const patchUser = (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const updatedFields = req.body;
  res.json({
    message: `Received a PATCH HTTP method for user ${userId}`,
    data: updatedFields,
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const userId: string = req.params.id;
  res.json({
    message: `Received a DELETE for ${userId}`,
  });
};
