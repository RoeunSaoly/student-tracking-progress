import { Router } from "express";
import * as controller from "./teacher.controller.js";
import { authorizePermission } from "../../../middlewares/permission.middleware.js";

const router = Router();

router.get("/pending", authorizePermission("user.read"), controller.getPendingTeachers);
router.put("/:id/approve", authorizePermission("user.update"), controller.approveTeacher);
router.put("/:id/reject", authorizePermission("user.update"), controller.rejectTeacher);

export default router;
