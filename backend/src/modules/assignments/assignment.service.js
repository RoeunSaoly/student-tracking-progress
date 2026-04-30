import * as repo from "./assignment.repository.js";

export const createAssignment = async (data) => {
  const assignmentId = await repo.createAssignment(data);
  return { assignmentId };
};

export const updateAssignment = async (id, data) => {
  const assignment = await repo.findAssignmentById(id);
  if (!assignment) throw new Error("Assignment not found");
  await repo.updateAssignment(id, data);
  return { message: "Assignment updated successfully" };
};

export const deleteAssignment = async (id) => {
  const assignment = await repo.findAssignmentById(id);
  if (!assignment) throw new Error("Assignment not found");
  await repo.deleteAssignment(id);
  return { message: "Assignment deleted successfully" };
};

export const getAssignmentsByClass = async (classId) => {
  return await repo.findAssignmentsByClass(classId);
};

export const getAssignmentById = async (id) => {
  const assignment = await repo.findAssignmentById(id);
  if (!assignment) throw new Error("Assignment not found");
  return assignment;
};

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


