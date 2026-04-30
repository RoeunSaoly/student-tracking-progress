import * as repo from "./class.repository.js";

export const createClass = async (data, user) => {
  if (user.role !== "teacher") {
    throw new Error("Only teacher can create class");
  }

  const classId = await repo.createClass({
    teacher_id: user.id,
    ...data,
  });

  return { classId };
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