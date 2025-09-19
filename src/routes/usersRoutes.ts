import type { Response, NextFunction } from "express";
import { Router } from "express";
import { userModelRateLimit } from "../common/constants/rateLimitOptions";
import type { CreateUserDto, RequestWithUser } from "../types/User";
import type { ApiResponse } from "../types/Api";
import {
  deleteUser,
  getUser,
  patchUser,
  postUser,
  putUser,
} from "../controllers/userController";

const router = Router();

const validateUsers = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  const { name, email } = req.body as CreateUserDto;
  if (!name || !email) {
    return res.status(400).json({
      status: "error",
      message: "Name and email are required",
    } as ApiResponse);
  }
  next();
};

router.use(userModelRateLimit);

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User operations
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: List users
 *     description: Returns a confirmation for a GET request. Replace with real listing logic.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful GET acknowledgement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Received GET
 */
router.get("/", getUser);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create user
 *     description: Validates payload and returns the created user echo. Name and email are required by validateUsers middleware.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ada Lovelace
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ada@example.com
 *     responses:
 *       201:
 *         description: User created acknowledgement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Received POST
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Validation error (missing name or email)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Name and email are required
 */
router.post("/", validateUsers, postUser);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Replace/update user
 *     description: Validates payload and echoes the updated fields for the specified user ID.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User identifier
 *         schema:
 *           type: string
 *           example: 123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Grace Hopper
 *               email:
 *                 type: string
 *                 format: email
 *                 example: grace@example.com
 *     responses:
 *       200:
 *         description: PUT acknowledgement with updated fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Received PATCH for 123
 *                 data:
 *                   type: object
 *       400:
 *         description: Validation error (missing name or email)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Name and email are required
 */
router.put("/:id", validateUsers, putUser);

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     summary: Partially update user
 *     description: Partially updates fields for a user and echoes the updated fields.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User identifier
 *         schema:
 *           type: string
 *           example: 123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *           examples:
 *             partialUpdate:
 *               summary: Example partial update
 *               value:
 *                 name: New Name
 *     responses:
 *       200:
 *         description: PATCH acknowledgement with updated fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Received a PATCH HTTP method for user 123
 *                 data:
 *                   type: object
 */
router.patch("/:id", patchUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Deletes a user and returns a confirmation message.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User identifier
 *         schema:
 *           type: string
 *           example: 123
 *     responses:
 *       200:
 *         description: DELETE acknowledgement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Received a DELETE for 123
 */
router.delete("/:id", deleteUser);

export default router;
