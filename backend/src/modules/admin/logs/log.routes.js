import { Router } from "express";
import * as controller from "./log.controller.js";
import { authorizePermission } from "../../../middlewares/permission.middleware.js";

const router = Router();

router.get("/", authorizePermission("admin.logs"), controller.getLogs);

export default router;
