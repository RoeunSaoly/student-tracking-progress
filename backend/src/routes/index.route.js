import express from "express";
import userRoutes from "../modules/users/user.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import classRoutes from "../modules/classes/class.routes.js";
import assignmentRoutes from "../modules/assignments/assignment.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import gradeRoutes from "../modules/grades/grade.routes.js";
import adminRoutes from "../modules/admin/admin.routes.js";


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/classes", classRoutes);
router.use("/assignments", assignmentRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/grades", gradeRoutes);
router.use("/admin", adminRoutes);

export default router;
