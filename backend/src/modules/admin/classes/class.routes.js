import { Router } from "express";
import * as controller from "./class.controller.js";
import { authorizePermission } from "../../../middlewares/permission.middleware.js";

const router = Router();

router.get("/", authorizePermission("user.read"), controller.getClasses);
router.get("/:id", authorizePermission("user.read"), controller.getClassDetails);
router.delete("/:id", authorizePermission("class.delete"), controller.deleteClass);

export default router;
