import * as service from "./user.service.js";

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const getUsers = asyncHandler(async (req, res) => {
    const users = await service.getAllUsers(req.query);
    res.json(users);
});

export const getUserById = asyncHandler(async (req, res) => {
    const user = await service.getUserById(req.params.id);
    res.json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
    const result = await service.updateUser(req.params.id, req.body, req.user.id);
    res.json(result);
});

export const deleteUser = asyncHandler(async (req, res) => {
    const result = await service.deleteUser(req.params.id, req.user.id);
    res.json(result);
});
