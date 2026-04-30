import * as repo from "./auth.repository.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/jwt.js";

export const register = async (data) => {
    const { email, password, username } = data;

    const existing = await repo.findByEmail(email);
    if (existing) throw new Error("Email already exists");

    const password_hash = await hashPassword(password);

    const userId = await repo.createUser({
        email,
        username,
        password_hash,
    });

    const accessToken = generateAccessToken({ id: userId });
    const refreshToken = generateRefreshToken({ id: userId });

    return { userId, accessToken, refreshToken };
};

export const login = async ({ email, password }) => {
    const user = await repo.findByEmail(email);
    if (!user) throw new Error("User not found");

    const valid = await comparePassword(password, user.password_hash);
    if (!valid) throw new Error("Invalid password");

    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    return { accessToken, refreshToken };
};