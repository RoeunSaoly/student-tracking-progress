import db from "../../config/db.js";

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

// Also we need to check if assignment exists for submission
export const findAssignmentById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM assignments WHERE id = ?`, [id]);
  return rows[0];
};
