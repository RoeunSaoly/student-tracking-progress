import { Router } from "express";
import * as controller from "./user.controller.js";
import { authorizePermission } from "../../../middlewares/permission.middleware.js";

const router = Router();

router.get("/", authorizePermission("user.read"), controller.getUsers);
router.get("/:id", authorizePermission("user.read"), controller.getUserById);
router.put("/:id", authorizePermission("user.update"), controller.updateUser);
router.delete("/:id", authorizePermission("user.delete"), controller.deleteUser);
router.patch("/:id/validate", authorizePermission("user.update"), controller.validateTeacher);
router.get("/:id/academic-record", authorizePermission("user.read"), controller.getStudentDetails);

export default router;
