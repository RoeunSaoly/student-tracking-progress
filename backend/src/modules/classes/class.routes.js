import express from "express";
import * as controller from "./class.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Classes
 */

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Create class (Teacher only)
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", protect, authorize("teacher"), controller.createClass);

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 */
router.get("/", controller.getAllClasses);

/**
 * @swagger
 * /api/classes/{id}:
 *   get:
 *     summary: Get class by ID
 */
router.get("/:id", controller.getClassById);

/**
 * @swagger
 * /api/classes/{id}:
 *   delete:
 *     summary: Delete class
 */
router.delete(
  "/:id",
  protect,
  authorize("teacher", "admin"),
  controller.deleteClass
);

export default router;