import express from "express";
import * as controller from "./class.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizePermission } from "../../middlewares/permission.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Classes
 */

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Create class (Teacher only)
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authenticate, authorizePermission("class.create"), controller.createClass);

/**
 * @swagger
 * /classes/join:
 *   post:
 *     summary: Join class by code (Student only)
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code]
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Joined class successfully
 */
router.post("/join", authenticate, authorizePermission("class.join"), controller.joinClass);

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 */
router.get("/", controller.getAllClasses);

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Get class by ID
 */
router.get("/:id", controller.getClassById);

/**
 * @swagger
 * /classes/{id}:
 *   delete:
 *     summary: Delete class
 */
router.delete(
  "/:id",
  authenticate,
  authorizePermission("class.delete"),
  controller.deleteClass
);

export default router;