import type { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  findUserById,
  updateUser,
} from "../services/userServiceV2";
import type { CreateUserDto, UserResponse } from "../types/User";
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
        id: user._id.toString(),
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
  try {
    const user: CreateUserDto = req.body;
    const createdUser = await createUser(user);

    if (!createdUser) {
      return res.status(400).json({
        status: "error",
        message: "Failed to create user",
      });
    }

    const response: ApiResponse<UserResponse> = {
      status: "success",
      data: {
        id: createdUser._id.toString(),
        name: createdUser.name,
        email: createdUser.email,
      },
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to create user",
    });
  }
};

export const putUserV2 = async (req: Request, res: Response) => {
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
        id: updatedUser?._id?.toString() ?? "",
        name: updatedUser.name ?? "",
        email: updatedUser.email ?? "",
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
      return res.status(404).json({});
    }

    const response: ApiResponse<UserResponse> = {
      status: "success",
      data: {
        id: updatedUser._id?.toString() ?? "",
        name: updatedUser.name ?? "",
        email: updatedUser.email ?? "",
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
