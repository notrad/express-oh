import type { Request, Response } from "express";
import type { CreateUserDto, UserResponse } from "../types/User";
import type { ApiResponse } from "../types/Api";

export function getUser(req: Request, res: Response) {
  res.json({ message: "Received GET" });
}

export function postUser(req: Request, res: Response) {
  const newUser: CreateUserDto = req.body;
  const response: ApiResponse<UserResponse> = {
    status: "success",
    data: {
      id: "1",
      ...newUser,
    },
  };

  res.json(response);
}

export function putUser(req: Request, res: Response) {
  const userId: string = req.params.id;
  const updatedFields = req.body;
  res.json({
    message: `Received PATCH for ${userId}`,
    data: updatedFields,
  });
}

export function patchUser(req: Request, res: Response) {
  const userId: string = req.params.id;
  const updatedFields = req.body;
  res.json({
    message: `Received a PATCH HTTP method for user ${userId}`,
    data: updatedFields,
  });
}

export function deleteUser(req: Request, res: Response) {
  const userId: string = req.params.id;
  res.json({
    message: `Received a DELETE for ${userId}`,
  });
}
