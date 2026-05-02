import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";

import dashboardRoutes from "./dashboard/dashboard.routes.js";
import userRoutes from "./users/user.routes.js";
import teacherRoutes from "./teachers/teacher.routes.js";
import classRoutes from "./classes/class.routes.js";
import logRoutes from "./logs/log.routes.js";

const router = Router();

// Apply global authentication for all admin routes
router.use(authenticate);

// Register sub-routes
router.use("/dashboard", dashboardRoutes);
router.use("/users", userRoutes);
router.use("/teachers", teacherRoutes);
router.use("/classes", classRoutes);
router.use("/logs", logRoutes);

export default router;
