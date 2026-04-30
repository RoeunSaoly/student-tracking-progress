import * as service from "./admin.service.js";

// Users
export const getUsers = async (req, res) => {
    try {
        const users = await service.getAllUsers(req.query);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await service.getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const result = await service.updateUser(req.params.id, req.body, req.user.id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const result = await service.deleteUser(req.params.id, req.user.id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Teacher Approval
export const getPendingTeachers = async (req, res) => {
    try {
        const result = await service.getPendingTeachers();
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const approveTeacher = async (req, res) => {
    try {
        const result = await service.validateTeacher(req.params.id, true);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const rejectTeacher = async (req, res) => {
    try {
        const result = await service.validateTeacher(req.params.id, false);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Classes
export const getClasses = async (req, res) => {
    try {
        const result = await service.getAllClasses();
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getClassDetails = async (req, res) => {
    try {
        const result = await service.getClassDetails(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const deleteClass = async (req, res) => {
    try {
        const result = await service.deleteClass(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Dashboard
export const getDashboard = async (req, res) => {
    try {
        const result = await service.getAdminDashboard();
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Logs
export const getLogs = async (req, res) => {
    try {
        const result = await service.getActivityLogs(req.query);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
