import type { Response, NextFunction } from "express";
import { Router } from "express";
import { userModelRateLimit } from "../common/constants/rateLimitOptions";
import type { CreateUserDto } from "../types/User";
import type { ApiResponse } from "../types/Api";
import {
  removeUser,
  getUser,
  patchUser,
  postUser,
  putUser,
} from "../controllers/userController";
import type { AuthenticatedRequest } from "../types/Auth";

const router = Router();

const validateUsers = (
  req: AuthenticatedRequest,
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
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *             required:
 *               - name
 *               - email
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Invalid or missing bearer token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden - Invalid permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /users/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update user completely
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary: Update user partially
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", getUser);

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
router.delete("/:id", removeUser);

export default router;
