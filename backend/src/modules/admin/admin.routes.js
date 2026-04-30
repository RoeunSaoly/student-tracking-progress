import { Router } from "express";
import * as controller from "./admin.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizePermission } from "../../middlewares/permission.middleware.js";

const router = Router();

// Apply global admin protection (using user.read as a baseline for admin access, or admin.dashboard)
router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Central management for platform administrators
 */

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get system-wide statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/dashboard", authorizePermission("admin.dashboard"), controller.getDashboard);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: List all users with filtering and pagination
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/users", authorizePermission("user.read"), controller.getUsers);

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/users/:id", authorizePermission("user.read"), controller.getUserById);

/**
 * @swagger
 * /admin/users/{id}:
 *   put:
 *     summary: Update user (role, validation, active status)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.put("/users/:id", authorizePermission("user.update"), controller.updateUser);

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Soft delete user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/users/:id", authorizePermission("user.delete"), controller.deleteUser);

/**
 * @swagger
 * /admin/teachers/pending:
 *   get:
 *     summary: Get unvalidated teachers
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/teachers/pending", authorizePermission("user.read"), controller.getPendingTeachers);

/**
 * @swagger
 * /admin/teachers/{id}/approve:
 *   put:
 *     summary: Approve a teacher
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.put("/teachers/:id/approve", authorizePermission("user.update"), controller.approveTeacher);

/**
 * @swagger
 * /admin/teachers/{id}/reject:
 *   put:
 *     summary: Reject a teacher
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.put("/teachers/:id/reject", authorizePermission("user.update"), controller.rejectTeacher);

/**
 * @swagger
 * /admin/classes:
 *   get:
 *     summary: View all classes
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/classes", authorizePermission("user.read"), controller.getClasses);

/**
 * @swagger
 * /admin/classes/{id}:
 *   get:
 *     summary: View class details (students, teacher)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/classes/:id", authorizePermission("user.read"), controller.getClassDetails);

/**
 * @swagger
 * /admin/classes/{id}:
 *   delete:
 *     summary: Delete a class
 *     tags: [Admin]
 *     security:       - bearerAuth: []
 */
router.delete("/classes/:id", authorizePermission("class.delete"), controller.deleteClass);

/**
 * @swagger
 * /admin/logs:
 *   get:
 *     summary: View system activity logs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get("/logs", authorizePermission("admin.logs"), controller.getLogs);

export default router;
