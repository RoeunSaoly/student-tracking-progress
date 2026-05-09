import { Router } from "express";
import * as controller from "./student.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = Router();

router.use(authenticate);
router.use(authorizeRoles("teacher", "admin"));

router.get("/my-students", controller.getMyStudents);
router.get("/:id/profile", controller.getStudentProfile);

export default router;
