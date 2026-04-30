import * as service from "./class.service.js";

export const createClass = async (req, res) => {
  try {
    const result = await service.createClass(req.body, req.user);
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
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};