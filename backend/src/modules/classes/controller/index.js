import * as service from "../service/index.js";
import { logActivity } from "../../logs/service/index.js"; // Updated path to logs service
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";

export const createClass = asyncHandler(async (req, res) => {
    const result = await service.createClass(req.body, req.user);
    await logActivity(req.user.id, `Created class: ${req.body.name}`);
    res.status(201).json(result);
});

export const getAllClasses = asyncHandler(async (req, res) => {
    const data = await service.getAllClasses();
    res.json(data);
});

export const getClassById = asyncHandler(async (req, res) => {
    const data = await service.getClassById(req.params.id);
    res.json(data);
});

export const deleteClass = asyncHandler(async (req, res) => {
    await service.deleteClass(req.params.id, req.user);
    await logActivity(req.user.id, `Deleted class ID: ${req.params.id}`);
    res.json({ message: "Deleted successfully" });
});

export const joinClass = asyncHandler(async (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ message: "Class code is required" });
    }

    const result = await service.joinClass(code, req.user.id);
    await logActivity(req.user.id, `Joined class by code: ${code}`);
    res.json(result);
});

export const removeStudent = asyncHandler(async (req, res) => {
    const { id, studentId } = req.params;
    const result = await service.removeStudentFromClass(id, studentId, req.user);
    await logActivity(req.user.id, `Removed student ID: ${studentId} from class ID: ${id}`);
    res.json(result);
});

export const updateClass = asyncHandler(async (req, res) => {
    const result = await service.updateClass(req.params.id, req.body, req.user);
    res.json(result);
});

export const getEnrolledStudents = asyncHandler(async (req, res) => {
    const result = await service.getEnrolledStudents(req.params.id, req.user);
    res.json(result);
});