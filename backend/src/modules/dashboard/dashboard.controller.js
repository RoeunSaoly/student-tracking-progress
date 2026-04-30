import * as service from "./dashboard.service.js";

export const getStudentDashboard = async (req, res) => {
  try {
    const result = await service.getStudentDashboard(req.user.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTeacherDashboard = async (req, res) => {
  try {
    const result = await service.getTeacherDashboard(req.user.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
