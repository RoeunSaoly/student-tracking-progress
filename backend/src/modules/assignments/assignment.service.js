import * as repo from "./assignment.repository.js";
import * as classRepo from "../classes/class.repository.js";

export const createAssignment = async (data, userId) => {
  const classData = await classRepo.findById(data.class_id);
  if (!classData) throw new Error("Class not found");

  if (classData.teacher_id !== userId) {
    throw new Error("Unauthorized: Only the class teacher can create assignments");
  }

  const assignmentId = await repo.createAssignment(data);
  return { assignmentId };
};

export const updateAssignment = async (id, data, userId) => {
  const assignment = await repo.findAssignmentById(id);
  if (!assignment) throw new Error("Assignment not found");

  const classData = await classRepo.findById(assignment.class_id);
  if (classData.teacher_id !== userId) {
    throw new Error("Unauthorized");
  }

  await repo.updateAssignment(id, data);
  return { message: "Assignment updated successfully" };
};

export const deleteAssignment = async (id, userId) => {
  const assignment = await repo.findAssignmentById(id);
  if (!assignment) throw new Error("Assignment not found");

  const classData = await classRepo.findById(assignment.class_id);
  if (classData.teacher_id !== userId) {
    throw new Error("Unauthorized");
  }

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



