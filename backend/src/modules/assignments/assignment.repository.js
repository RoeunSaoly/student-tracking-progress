import db from "../../config/db.js";

// Assignments
export const createAssignment = async (data) => {
  const { class_id, title, description, due_date, max_score } = data;
  const [result] = await db.query(
    `INSERT INTO assignments (class_id, title, description, due_date, max_score)
     VALUES (?, ?, ?, ?, ?)`,
    [class_id, title, description, due_date, max_score]
  );
  return result.insertId;
};

export const updateAssignment = async (id, data) => {
  const { title, description, due_date, max_score } = data;
  await db.query(
    `UPDATE assignments 
     SET title = ?, description = ?, due_date = ?, max_score = ?
     WHERE id = ?`,
    [title, description, due_date, max_score, id]
  );
};

export const deleteAssignment = async (id) => {
  await db.query(`DELETE FROM assignments WHERE id = ?`, [id]);
};

export const findAssignmentsByClass = async (classId) => {
  const [rows] = await db.query(
    `SELECT * FROM assignments WHERE class_id = ? ORDER BY created_at DESC`,
    [classId]
  );
  return rows;
};

export const findAssignmentById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM assignments WHERE id = ?`, [id]);
  return rows[0];
};

// Submissions
export const createSubmission = async (data) => {
  const { assignment_id, student_id, file_path, status } = data;
  const [result] = await db.query(
    `INSERT INTO submissions (assignment_id, student_id, file_path, status)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE 
     file_path = VALUES(file_path), status = VALUES(status), submitted_at = CURRENT_TIMESTAMP`,
    [assignment_id, student_id, file_path, status]
  );
  return result.insertId;
};

export const findSubmissionsByAssignment = async (assignmentId) => {
  const [rows] = await db.query(
    `SELECT s.*, u.username as student_name, u.email as student_email
     FROM submissions s
     JOIN users u ON s.student_id = u.id
     WHERE s.assignment_id = ?`,
    [assignmentId]
  );
  return rows;
};

export const findSubmissionsByStudent = async (studentId) => {
  const [rows] = await db.query(
    `SELECT s.*, a.title as assignment_title, a.due_date
     FROM submissions s
     JOIN assignments a ON s.assignment_id = a.id
     WHERE s.student_id = ?`,
    [studentId]
  );
  return rows;
};


