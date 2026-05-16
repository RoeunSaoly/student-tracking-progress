import * as repo from "../repository/index.js";
import * as classRepo from "../../classes/repository/index.js";

export const submitAssignment = async (data) => {
  const assignment = await repo.findAssignmentById(data.assignment_id);
  if (!assignment) throw new Error("Assignment not found");

  // Check enrollment
  const isEnrolled = await classRepo.checkEnrollment(assignment.class_id, data.student_id);
  if (!isEnrolled) {
    throw new Error("You are not enrolled in the class for this assignment");
  }

  // Check if late
  const dueDate = new Date(assignment.due_date);
  const now = new Date();
  const status = now > dueDate ? "late" : "submitted";

  const submissionId = await repo.createSubmission({
    ...data,
    status,
  });

  return { submissionId, status, message: status === "late" ? "Submitted late" : "Submitted successfully" };
};

export const getSubmissionsByAssignment = async (assignmentId) => {
  return await repo.findSubmissionsByAssignment(assignmentId);
};

export const getSubmissionsByStudent = async (studentId) => {
  return await repo.findSubmissionsByStudent(studentId);
};
