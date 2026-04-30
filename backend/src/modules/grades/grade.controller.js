import * as service from "./grade.service.js";
import { logActivity } from "../logs/log.service.js";

export const createGrade = async (req, res) => {
  try {
    const { submission_id, score, feedback } = req.body;
    if (!submission_id || score === undefined) {
      return res.status(400).json({ message: "submission_id and score are required" });
    }

    const result = await service.gradeSubmission({ submission_id, score, feedback });
    await logActivity(req.user.id, `Graded submission ID: ${submission_id}`);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.message === "Submission not found" ? 404 : 500).json({ message: err.message });
  }
};

export const getGrade = async (req, res) => {
  try {
    const result = await service.getGradeBySubmission(req.params.submissionId);
    if (!result) return res.status(404).json({ message: "Grade not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
