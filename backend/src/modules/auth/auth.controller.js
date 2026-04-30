import * as service from "./auth.service.js";

export const register = async (req, res, next) => {
    try {
        const data = await service.register(req.body);
        res.json(data);
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const data = await service.login(req.body);
        res.json(data);
    } catch (err) {
        next(err);
    }
};