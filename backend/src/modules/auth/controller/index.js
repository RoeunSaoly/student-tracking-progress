import * as service from "../service/index.js";
import { logActivity } from "../../logs/service/index.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
    const result = await service.register(req.body);
    res.status(201).json(result);
});

export const login = asyncHandler(async (req, res) => {
    const result = await service.login(req.body);
    res.json(result);
});

export const refreshToken = asyncHandler(async (req, res) => {
    const result = await service.refreshAccessToken(req.body.refreshToken);
    res.json(result);
});

export const logout = asyncHandler(async (req, res) => {
    // In a real app, you might want to blacklist the token in Redis
    await logActivity(req.user.id, "User logged out");
    res.json({ message: "Logged out successfully" });
});