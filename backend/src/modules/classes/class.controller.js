import * as service from "./class.service.js";
import { logActivity } from "../logs/log.service.js";

export const createClass = async (req, res) => {
  try {
    const result = await service.createClass(req.body, req.user);
    await logActivity(req.user.id, `Created class: ${req.body.name}`);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const data = await service.getAllClasses();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClassById = async (req, res) => {
  try {
    const data = await service.getClassById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    await service.deleteClass(req.params.id, req.user);
    await logActivity(req.user.id, `Deleted class ID: ${req.params.id}`);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

export const joinClass = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "Class code is required" });
    }

    const result = await service.joinClass(code, req.user.id);
    await logActivity(req.user.id, `Joined class by code: ${code}`);
    res.json(result);
  } catch (err) {
    const statusCode = err.message.includes("not found") ? 404 : 400;
    res.status(statusCode).json({ message: err.message });
  }
};

export const removeStudent = async (req, res) => {
  try {
    const { id, studentId } = req.params;
    const result = await service.removeStudentFromClass(id, studentId, req.user);
    await logActivity(req.user.id, `Removed student ID: ${studentId} from class ID: ${id}`);
    res.json(result);
  } catch (err) {
    const statusCode = err.message.includes("Unauthorized") ? 403 : 404;
    res.status(statusCode).json({ message: err.message });
  }
};