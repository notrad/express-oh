import type { Request, Response } from "express";
import type { CreateUserDto, UserResponse } from "../types/User";
import type { ApiResponse } from "../types/Api";
import {
  findUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await findUserById(userId);

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

export const postUser = async (req: Request, res: Response) => {
  try {
    const newUser: CreateUserDto = req.body;
    const createdUser = await createUser(newUser);

    if (!createdUser) {
      return res.status(400).json({
        status: "error",
        message: "Failed to create user",
      });
    }

    const response: ApiResponse<UserResponse> = {
      status: "success",
      data: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to create user",
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedFields = req.body;

    const updatedUser = await updateUser(userId, updatedFields);

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const response: ApiResponse<UserResponse> = {
      status: "success",
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update user",
    });
  }
};

export const patchUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedFields = req.body;

    const updatedUser = await updateUser(userId, updatedFields);

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const response: ApiResponse<UserResponse> = {
      status: "success",
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update user",
    });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await deleteUser(userId);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete user",
    });
  }
};
