import * as service from "../service/index.js";
import { logActivity } from "../../logs/service/index.js";

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export const createAssignment = asyncHandler(async (req, res) => {
    const result = await service.createAssignment(req.body, req.user.id);
    await logActivity(req.user.id, `Created assignment: ${req.body.title}`);
    res.status(201).json(result);
});

export const getAssignmentsByClass = asyncHandler(async (req, res) => {
    const { class_id } = req.query;
    if (!class_id) return res.status(400).json({ message: "class_id is required" });
    
    const result = await service.getAssignmentsByClass(class_id);
    res.json(result);
});

export const getAssignmentById = asyncHandler(async (req, res) => {
    const result = await service.getAssignmentById(req.params.id);
    res.json(result);
});

export const updateAssignment = asyncHandler(async (req, res) => {
    const result = await service.updateAssignment(req.params.id, req.body, req.user.id);
    await logActivity(req.user.id, `Updated assignment ID: ${req.params.id}`);
    res.json(result);
});

export const deleteAssignment = asyncHandler(async (req, res) => {
    const result = await service.deleteAssignment(req.params.id, req.user.id);
    await logActivity(req.user.id, `Deleted assignment ID: ${req.params.id}`);
    res.json(result);
});
