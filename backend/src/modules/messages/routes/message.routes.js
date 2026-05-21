import { Router } from "express";
import * as controller from "../controller/message.controller.js";
import { authenticate } from "../../../shared/middleware/auth.middleware.js";
import { authorizeRoles } from "../../../shared/middleware/role.middleware.js";
import { validateRequest } from "../../../shared/middleware/validate.middleware.js";
import { messageSchema, announcementSchema } from "../validation/message.validation.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messaging and announcements
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [receiver_id, content]
 *             properties:
 *               receiver_id:
 *                 type: integer
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent
 */
router.post("/", authenticate, validateRequest(messageSchema), controller.sendMessage);

/**
 * @swagger
 * /messages/{userId}:
 *   get:
 *     summary: Get conversation with a user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Conversation history
 */
router.get("/:userId", authenticate, controller.getConversation);

/**
 * @swagger
 * /messages/announcements:
 *   post:
 *     summary: Create an announcement (Admin only)
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Announcement created
 */
router.post("/announcements", authenticate, authorizeRoles("admin"), validateRequest(announcementSchema), controller.createAnnouncement);

/**
 * @swagger
 * /messages/announcements:
 *   get:
 *     summary: Get all announcements
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of announcements
 */
router.get("/announcements", authenticate, controller.getAnnouncements);

export default router;
