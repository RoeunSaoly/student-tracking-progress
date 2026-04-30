import * as service from "./assignment.service.js";
import { assignmentSchema, updateAssignmentSchema, submissionSchema } from "./assignment.validation.js";
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

// Submissions
export const submitAssignment = async (req, res) => {
  try {
    const { error } = submissionSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const result = await service.submitAssignment({
      ...req.body,
      student_id: req.user.id
    });
    await logActivity(req.user.id, `Submitted assignment ID: ${req.body.assignment_id}`);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const { assignment_id } = req.query;
    if (!assignment_id) return res.status(400).json({ message: "assignment_id is required" });

    const result = await service.getSubmissionsByAssignment(assignment_id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMySubmissions = async (req, res) => {
  try {
    const result = await service.getSubmissionsByStudent(req.user.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


