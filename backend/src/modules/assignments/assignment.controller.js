import * as service from "./assignment.service.js";
import { assignmentSchema, updateAssignmentSchema } from "./assignment.validation.js";
import { logActivity } from "../logs/log.service.js";

export const createAssignment = async (req, res) => {
  try {
    const { error } = assignmentSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const result = await service.createAssignment(req.body);
    await logActivity(req.user.id, `Created assignment: ${req.body.title}`);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllAssignments = async (req, res) => {
  try {
    const { class_id } = req.query;
    if (!class_id) return res.status(400).json({ message: "class_id is required" });
    
    const result = await service.getAssignmentsByClass(class_id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAssignmentById = async (req, res) => {
  try {
    const result = await service.getAssignmentById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    const { error } = updateAssignmentSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const result = await service.updateAssignment(req.params.id, req.body);
    await logActivity(req.user.id, `Updated assignment ID: ${req.params.id}`);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const result = await service.deleteAssignment(req.params.id);
    await logActivity(req.user.id, `Deleted assignment ID: ${req.params.id}`);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



