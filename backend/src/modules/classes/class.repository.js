import db from "../../config/db.js";

export const createClass = async ({ teacher_id, name, code, description }) => {
  const [result] = await db.query(
    `INSERT INTO classes (teacher_id, name, code, description)
     VALUES (?, ?, ?, ?)`,
    [teacher_id, name, code, description]
  );

  return result.insertId;
};

export const findAll = async () => {
  const [rows] = await db.query(
    `SELECT c.*, u.username AS teacher_name
     FROM classes c
     JOIN users u ON c.teacher_id = u.id`
  );

  return rows;
};

export const findById = async (id) => {
  const [rows] = await db.query(
    `SELECT c.*, u.username AS teacher_name
     FROM classes c
     JOIN users u ON c.teacher_id = u.id
     WHERE c.id = ?`,
    [id]
  );

  return rows[0];
};

export const findEnrolledStudents = async (classId) => {
  const [rows] = await db.query(
    `SELECT u.id, u.username, u.email, p.first_name, p.last_name, e.enrolled_at, e.status
     FROM users u
     JOIN enrollments e ON u.id = e.student_id
     LEFT JOIN user_profiles p ON u.id = p.user_id
     WHERE e.class_id = ?`,
    [classId]
  );
  return rows;
};

export const deleteClass = async (id) => {
  await db.query(`DELETE FROM classes WHERE id = ?`, [id]);
};

export const findByCode = async (code) => {
  const [rows] = await db.query(`SELECT * FROM classes WHERE code = ?`, [code]);
  return rows[0];
};

export const checkEnrollment = async (classId, studentId) => {
  const [rows] = await db.query(
    `SELECT * FROM enrollments WHERE class_id = ? AND student_id = ?`,
    [classId, studentId]
  );
  return rows.length > 0;
};

export const enrollStudent = async (classId, studentId) => {
  await db.query(
    `INSERT INTO enrollments (class_id, student_id) VALUES (?, ?)`,
    [classId, studentId]
  );
};

export const removeStudent = async (classId, studentId) => {
  await db.query(
    `DELETE FROM enrollments WHERE class_id = ? AND student_id = ?`,
    [classId, studentId]
  );
};

export const updateClass = async (id, data) => {
  const fields = [];
  const params = [];
  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = ?`);
    params.push(value);
  }
  params.push(id);
  await db.query(`UPDATE classes SET ${fields.join(", ")} WHERE id = ?`, params);
};

export const findStudentsByTeacher = async (teacherId) => {
  const [rows] = await db.query(
    `SELECT DISTINCT u.id, u.username, u.email, up.first_name, up.last_name
     FROM users u
     JOIN enrollments e ON u.id = e.student_id
     JOIN classes c ON e.class_id = c.id
     LEFT JOIN user_profiles up ON u.id = up.user_id
     WHERE c.teacher_id = ? AND e.status = 'active'`,
    [teacherId]
  );
  return rows;
};