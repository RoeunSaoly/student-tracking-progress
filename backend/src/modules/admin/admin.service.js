import * as repo from "./admin.repository.js";

// User Management
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
    
    // Check if role update is valid (simplified logic)
    if (data.role) {
        // Implementation for role update would go here if needed
        // For now we support updating is_active and is_validated
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

// Teacher Approval
export const getPendingTeachers = async () => {
    return await repo.findPendingTeachers();
};

export const validateTeacher = async (id, isValidated) => {
    const user = await repo.findUserById(id);
    if (!user) throw new Error("Teacher not found");
    
    await repo.updateUser(id, { is_validated: isValidated });
    return { message: isValidated ? "Teacher approved" : "Teacher rejected" };
};

// Class Management
export const getAllClasses = async () => {
    return await repo.findAllClasses();
};

export const getClassDetails = async (id) => {
    const classData = await repo.findClassDetails(id);
    if (!classData) throw new Error("Class not found");
    return classData;
};

export const deleteClass = async (id) => {
    await repo.deleteClass(id);
    return { message: "Class deleted successfully" };
};

// Dashboard
export const getAdminDashboard = async () => {
    return await repo.getSystemStats();
};

// Activity Logs
export const getActivityLogs = async (filters) => {
    return await repo.findActivityLogs(filters);
};
