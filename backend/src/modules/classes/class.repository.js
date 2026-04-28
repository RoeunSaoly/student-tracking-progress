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
    `SELECT * FROM classes WHERE id = ?`,
    [id]
  );

  return rows[0];
};

export const deleteClass = async (id) => {
  await db.query(`DELETE FROM classes WHERE id = ?`, [id]);
};