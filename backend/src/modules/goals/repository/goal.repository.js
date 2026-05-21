import db from "../../../config/db.js";

export const createGoal = async (data) => {
  const { student_id, title, target_date, target_value, type, assignment_id, progress } = data;
  const [result] = await db.query(
    `INSERT INTO goals (student_id, title, target_date, target_value, type, status, assignment_id, progress)
     VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)`,
    [student_id, title, target_date, target_value || 100, type || 'grade', assignment_id || null, progress || 0]
  );
  return result.insertId;
};

export const updateGoal = async (id, data) => {
  const { title, target_date, target_value, current_value, type, status, assignment_id, progress } = data;
  await db.query(
    `UPDATE goals SET title = ?, target_date = ?, target_value = ?, current_value = ?, type = ?, status = ?, assignment_id = ?, progress = ? WHERE id = ?`,
    [title, target_date, target_value, current_value, type, status, assignment_id, progress, id]
  );
};

export const deleteGoal = async (id) => {
  await db.query(`DELETE FROM goals WHERE id = ?`, [id]);
};

export const findGoalsByStudent = async (studentId) => {
  const [rows] = await db.query(
    `SELECT g.*, a.title as assignment_title 
     FROM goals g 
     LEFT JOIN assignments a ON g.assignment_id = a.id
     WHERE g.student_id = ? 
     ORDER BY g.created_at DESC`,
    [studentId]
  );
  return rows;
};

export const findGoalById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM goals WHERE id = ?`, [id]);
  return rows[0];
};

export const markGoalComplete = async (id) => {
  await db.query(`UPDATE goals SET status = 'completed', progress = 100 WHERE id = ?`, [id]);
};
