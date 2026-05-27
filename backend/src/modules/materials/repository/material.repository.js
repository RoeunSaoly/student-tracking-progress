import db from "../../../config/db.js";

export const createMaterial = async (data) => {
  const { class_id, title, file_url } = data;
  const [result] = await db.query(
    `INSERT INTO materials (class_id, title, file_url)
     VALUES (?, ?, ?)`,
    [class_id, title, file_url]
  );
  return result.insertId;
};

export const updateMaterial = async (id, data) => {
  const { title, file_url } = data;
  await db.query(
    `UPDATE materials SET title = ?, file_url = ? WHERE id = ?`,
    [title, file_url, id]
  );
};

export const deleteMaterial = async (id) => {
  await db.query(`DELETE FROM materials WHERE id = ?`, [id]);
};

export const findMaterialsByClass = async (classId) => {
  const [rows] = await db.query(
    `SELECT *
     FROM materials
     WHERE class_id = ? ORDER BY uploaded_at DESC`,
    [classId]
  );
  return rows;
};

export const findMaterialById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM materials WHERE id = ?`, [id]);
  return rows[0];
};
