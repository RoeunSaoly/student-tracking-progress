import * as service from "../service/index.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";

export const getMe = asyncHandler(async (req, res) => {
    const user = await service.getProfile(req.user.id);
    res.json(user);
});

export const updateProfile = asyncHandler(async (req, res) => {
    const result = await service.updateProfile(req.user.id, req.body);
    res.json(result);
});

export const uploadAvatar = asyncHandler(async (req, res) => {
    const avatar = await service.uploadAvatar(req.user.id, req.file);
    res.json({ avatar });
});

export const getAcademicRecord = asyncHandler(async (req, res) => {
    const record = await service.getAcademicRecord(req.user.id);
    res.json(record);
});