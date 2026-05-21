import * as repo from "../repository/index.js";

export const getProfile = async (id) => {
    return await repo.findById(id);
};

export const updateProfile = async (id, data) => {
    return await repo.updateProfile(id, data);
};

export const uploadAvatar = async (id, file) => {
    const avatarUrl = `/uploads/${file.filename}`;
    await repo.updateAvatar(id, avatarUrl);
    return avatarUrl;
};

export const getAcademicRecord = async (studentId) => {
    return await repo.getAcademicRecord(studentId);
};