import * as repo from "./auth.repository.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/jwt.js";

export const register = async (data) => {
    const { email, password, username, role = "student" } = data;

    const existing = await repo.findByEmail(email);
    if (existing) throw new Error("Email already exists");

    const role_id = await repo.findRoleIdByName(role);
    if (!role_id) throw new Error(`Role ${role} not found`);

    const password_hash = await hashPassword(password);

    const userId = await repo.createUser({
        email,
        username,
        password_hash,
        role_id
    });

    const accessToken = generateAccessToken({ id: userId, role_id });
    const refreshToken = generateRefreshToken({ id: userId });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await repo.saveRefreshToken(userId, refreshToken, expiresAt);

    return { userId, accessToken, refreshToken };
};

export const login = async ({ email, password }) => {
    const user = await repo.findByEmail(email);
    if (!user) throw new Error("User not found");

    const valid = await comparePassword(password, user.password_hash);
    if (!valid) throw new Error("Invalid password");

    const accessToken = generateAccessToken({ id: user.id, role_id: user.role_id });
    const refreshToken = generateRefreshToken({ id: user.id });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await repo.saveRefreshToken(user.id, refreshToken, expiresAt);

    return { userId: user.id, accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken) => {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) throw new Error("Invalid or expired refresh token");

    const tokenData = await repo.findRefreshToken(refreshToken);
    if (!tokenData) throw new Error("Refresh token revoked or not found");

    const user = await repo.findById(decoded.id);
    if (!user) throw new Error("User no longer exists");

    const newAccessToken = generateAccessToken({ id: user.id, role_id: user.role_id });

    return { accessToken: newAccessToken };
};