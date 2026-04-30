import { Router } from "express";
import * as controller from "./dashboard.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Activity overview for Students and Teachers
 */

/**
 * @swagger
 * /dashboard/student:
 *   get:
 *     summary: Get student dashboard overview
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student dashboard data
 */
router.get("/student", authenticate, authorizeRoles("student"), controller.getStudentDashboard);

/**
 * @swagger
 * /dashboard/teacher:
 *   get:
 *     summary: Get teacher dashboard overview
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Teacher dashboard data
 */
router.get("/teacher", authenticate, authorizeRoles("teacher"), controller.getTeacherDashboard);

export default router;
