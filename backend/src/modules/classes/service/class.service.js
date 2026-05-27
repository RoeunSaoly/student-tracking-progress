import * as repo from "../repository/class.repository.js";
import { logActivity } from "../../logs/service/log.service.js";

export const createClass = async (data, user) => {
  if (user.role !== "teacher") {
    throw new Error("Only teacher can create class");
  }

  // Generate a random class code if not provided
  const code = data.code || Math.random().toString(36).substring(2, 8).toUpperCase();

  const classId = await repo.createClass({
    ...data,
    teacher_id: user.id,
    code,
  });

  return { classId, code };
};

export const getAllClasses = async (user) => {
  if (user.role === "teacher") {
    return await repo.findByTeacher(user.id);
  } else if (user.role === "student") {
    return await repo.findByStudent(user.id);
  }
  return await repo.findAll();
};

export const getClassById = async (id) => {
  const data = await repo.findById(id);
  if (!data) throw new Error("Class not found");
  return data;
};

export const deleteClass = async (id, user) => {
  if (user.role !== "teacher" && user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await repo.deleteClass(id);
};

export const updateClass = async (id, data, user) => {
  const classData = await repo.findById(id);
  if (!classData) throw new Error("Class not found");

  if (user.role !== "admin" && String(classData.teacher_id) !== String(user.id)) {
    throw new Error("Unauthorized: Only the class teacher can update details");
  }

  await repo.updateClass(id, data);
  return { message: "Class updated successfully" };
};

export const joinClass = async (code, studentId) => {
  const classData = await repo.findByCode(code);
  if (!classData) {
    throw new Error("Class not found with this code");
  }

  const isEnrolled = await repo.checkEnrollment(classData.id, studentId);
  if (isEnrolled) {
    throw new Error("You are already enrolled in this class");
  }

  await repo.enrollStudent(classData.id, studentId);
  await logActivity(studentId, `Joined class: ${classData.name}`);

  return {
    message: "Joined class successfully",
    class: classData,
  };
};

export const removeStudentFromClass = async (classId, studentId, user) => {
  const classData = await repo.findById(classId);
  if (!classData) throw new Error("Class not found");

  // Only the teacher of the class or admin can remove a student
  if (user.role !== "admin" && String(classData.teacher_id) !== String(user.id)) {
    throw new Error("Unauthorized: Only the class teacher can remove students");
  }

  await repo.removeStudent(classId, studentId);
  return { message: "Student removed from class successfully" };
};

export const getEnrolledStudents = async (classId, user) => {
  const classData = await repo.findById(classId);
  if (!classData) throw new Error("Class not found");

  const isTeacher = String(classData.teacher_id) === String(user.id);
  const isAdmin = user.role === "admin";
  
  let isEnrolled = false;
  if (user.role === "student") {
    isEnrolled = await repo.checkEnrollment(classId, user.id);
  }

  if (!isAdmin && !isTeacher && !isEnrolled) {
    throw new Error("Unauthorized");
  }

  return await repo.findEnrolledStudents(classId);
};