import * as service from "./auth.service.js";
import { logActivity } from "../logs/log.service.js";

export const register = async (req, res, next) => {
    try {
        const data = await service.register(req.body);
        await logActivity(data.userId, `User registered: ${req.body.username}`);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const data = await service.login(req.body);
        await logActivity(data.userId, "User logged in");
        res.json(data);
    } catch (err) {
        next(err);
    }
};

export const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }

        const data = await service.refreshAccessToken(refreshToken);
        res.json(data);
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};