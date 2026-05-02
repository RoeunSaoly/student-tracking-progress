import { Router } from "express";
import * as controller from "./material.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizePermission } from "../../middlewares/permission.middleware.js";
import { validateRequest } from "../../core/middlewares/validate.middleware.js";
import { materialSchema, updateMaterialSchema } from "./material.validation.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Materials
 *   description: Class materials management
 */

/**
 * @swagger
 * /materials:
 *   post:
 *     summary: Upload new material (Teacher only)
 *     tags: [Materials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [class_id, title, file_path]
 *             properties:
 *               class_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               file_path:
 *                 type: string
 *     responses:
 *       201:
 *         description: Material uploaded
 */
router.post("/", authenticate, authorizePermission("class.update"), validateRequest(materialSchema), controller.createMaterial);

/**
 * @swagger
 * /materials:
 *   get:
 *     summary: Get materials for a class
 *     tags: [Materials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: class_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: List of materials
 */
router.get("/", authenticate, controller.getMaterialsByClass);

/**
 * @swagger
 * /materials/{id}:
 *   get:
 *     summary: Get material by ID
 *     tags: [Materials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Material details
 */
router.get("/:id", authenticate, controller.getMaterialById);

/**
 * @swagger
 * /materials/{id}:
 *   put:
 *     summary: Update material (Teacher only)
 *     tags: [Materials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               file_path:
 *                 type: string
 *     responses:
 *       200:
 *         description: Material updated
 */
router.put("/:id", authenticate, authorizePermission("class.update"), validateRequest(updateMaterialSchema), controller.updateMaterial);

/**
 * @swagger
 * /materials/{id}:
 *   delete:
 *     summary: Delete material (Teacher only)
 *     tags: [Materials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Material deleted
 */
router.delete("/:id", authenticate, authorizePermission("class.update"), controller.deleteMaterial);

export default router;
