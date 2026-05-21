import db from "../../../config/db.js";

export const createGrade = async ({ submission_id, score, feedback }) => {
  const [result] = await db.query(
    `INSERT INTO grades (submission_id, score, feedback)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE 
     score = VALUES(score), feedback = VALUES(feedback), graded_at = CURRENT_TIMESTAMP`,
    [submission_id, score, feedback]
  );
  return result.insertId;
};

export const findBySubmissionId = async (submissionId) => {
  const [rows] = await db.query(`SELECT * FROM grades WHERE submission_id = ?`, [submissionId]);
  return rows[0];
};

export const checkSubmissionExists = async (submissionId) => {
    const [rows] = await db.query(`SELECT id FROM submissions WHERE id = ?`, [submissionId]);
    return rows.length > 0;
}

export const findTeacherBySubmissionId = async (submissionId) => {
    const [rows] = await db.query(
        `SELECT c.teacher_id, a.max_score, s.student_id, a.title as assignment_title
         FROM submissions s
         JOIN assignments a ON s.assignment_id = a.id
         JOIN classes c ON a.class_id = c.id
         WHERE s.id = ?`,
        [submissionId]
    );
    return rows[0];
};
