import { Router } from "express";
import * as controller from "./dashboard.controller.js";
import { authorizePermission } from "../../../middlewares/permission.middleware.js";

const router = Router();

router.get("/", authorizePermission("admin.dashboard"), controller.getDashboard);

export default router;
