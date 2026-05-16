import db from "../../../config/db.js";

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



