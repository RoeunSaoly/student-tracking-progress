import * as repo from "./user.repository.js";

export const getProfile = async (userId) => {
    const user = await repo.findById(userId);

    if (!user) throw new Error("User not found");

    return user;
};

export const updateProfile = async (userId, data) => {
    await repo.updateProfile(userId, data);

    return { message: "Profile updated successfully" };
};

export const uploadAvatar = async (userId, file) => {
    if (!file) throw new Error("No file uploaded");

    const avatarUrl = `/uploads/avatars/${file.filename}`;

    await repo.updateAvatar(userId, avatarUrl);

    return avatarUrl;
};