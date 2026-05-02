import * as repo from "./user.repository.js";

export const getAllUsers = async (filters) => {
    return await repo.findAllUsers(filters);
};

export const getUserById = async (id) => {
    const user = await repo.findUserById(id);
    if (!user) throw new Error("User not found");
    return user;
};

export const updateUser = async (id, data, adminId) => {
    if (parseInt(id) === adminId && data.is_active === false) {
        throw new Error("Admin cannot deactivate themselves");
    }
    
    await repo.updateUser(id, data);
    return { message: "User updated successfully" };
};

export const deleteUser = async (id, adminId) => {
    if (parseInt(id) === adminId) {
        throw new Error("Admin cannot delete themselves");
    }
    await repo.softDeleteUser(id);
    return { message: "User deleted successfully" };
};
