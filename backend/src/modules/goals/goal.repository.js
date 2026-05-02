import db from "../../config/db.js";

export const createGoal = async (data) => {
  const { student_id, title, target_date } = data;
  const [result] = await db.query(
    `INSERT INTO goals (student_id, title, target_date, status)
     VALUES (?, ?, ?, 'pending')`,
    [student_id, title, target_date]
  );
  return result.insertId;
};

export const updateGoal = async (id, data) => {
  const { title, target_date, status } = data;
  await db.query(
    `UPDATE goals SET title = ?, target_date = ?, status = ? WHERE id = ?`,
    [title, target_date, status, id]
  );
};

export const deleteGoal = async (id) => {
  await db.query(`DELETE FROM goals WHERE id = ?`, [id]);
};

export const findGoalsByStudent = async (studentId) => {
  const [rows] = await db.query(
    `SELECT * FROM goals WHERE student_id = ? ORDER BY created_at DESC`,
    [studentId]
  );
  return rows;
};

export const findGoalById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM goals WHERE id = ?`, [id]);
  return rows[0];
};

export const markGoalComplete = async (id) => {
  await db.query(`UPDATE goals SET status = 'completed' WHERE id = ?`, [id]);
};
