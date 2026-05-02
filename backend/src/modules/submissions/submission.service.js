import * as repo from "./submission.repository.js";

export const submitAssignment = async (data) => {
  const assignment = await repo.findAssignmentById(data.assignment_id);
  if (!assignment) throw new Error("Assignment not found");

  // Check if late
  const dueDate = new Date(assignment.due_date);
  const now = new Date();
  const status = now > dueDate ? "late" : "submitted";

  const submissionId = await repo.createSubmission({
    ...data,
    status,
  });

  return { submissionId, status };
};

export const getSubmissionsByAssignment = async (assignmentId) => {
  return await repo.findSubmissionsByAssignment(assignmentId);
};

export const getSubmissionsByStudent = async (studentId) => {
  return await repo.findSubmissionsByStudent(studentId);
};
