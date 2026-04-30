import express from "express";
import userRoutes from "../modules/users/user.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import classRoutes from "../modules/classes/class.routes.js";


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/classes", classRoutes);

export default router;
