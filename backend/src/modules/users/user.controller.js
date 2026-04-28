import * as service from "./user.service.js";

export const getMe = async (req, res, next) => {
    try {
        const user = await service.getProfile(req.user.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const result = await service.updateProfile(req.user.id, req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const uploadAvatar = async (req, res, next) => {
    try {
        const avatar = await service.uploadAvatar(req.user.id, req.file);
        res.json({ avatar });
    } catch (err) {
        next(err);
    }
};