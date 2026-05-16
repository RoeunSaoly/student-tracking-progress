import * as repo from "../repository/index.js";

export const getAllUsers = async () => {
    return await repo.findAll();
};

export const getUserById = async (id) => {
    return await repo.findById(id);
};

export const updateUser = async (id, data) => {
    return await repo.update(id, data);
};

export const deleteUser = async (id) => {
    return await repo.delete(id);
};