import * as repo from "../repository/index.js";

export const createClass = async (data, user) => {
  if (user.role !== "teacher") {
    throw new Error("Only teacher can create class");
  }

  // Generate a random class code if not provided
  const code = data.code || Math.random().toString(36).substring(2, 8).toUpperCase();

  const classId = await repo.createClass({
    teacher_id: user.id,
    ...data,
    code,
  });

  return { classId, code };
};

export const getAllClasses = async () => {
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

  if (user.role !== "admin" && classData.teacher_id !== user.id) {
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

  return {
    message: "Joined class successfully",
    class: classData,
  };
};

export const removeStudentFromClass = async (classId, studentId, user) => {
  const classData = await repo.findById(classId);
  if (!classData) throw new Error("Class not found");

  // Only the teacher of the class or admin can remove a student
  if (user.role !== "admin" && classData.teacher_id !== user.id) {
    throw new Error("Unauthorized: Only the class teacher can remove students");
  }

  await repo.removeStudent(classId, studentId);
  return { message: "Student removed from class successfully" };
};

export const getEnrolledStudents = async (classId, user) => {
  const classData = await repo.findById(classId);
  if (!classData) throw new Error("Class not found");

  // Only the teacher of the class, admin, or an enrolled student can see the list
  // For now, let's allow teachers and admins
  if (user.role !== "admin" && classData.teacher_id !== user.id) {
    throw new Error("Unauthorized");
  }

  return await repo.findEnrolledStudents(classId);
};