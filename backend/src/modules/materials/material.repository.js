import db from "../../config/db.js";

export const createMaterial = async (data) => {
  const { class_id, title, description, file_path, uploaded_by } = data;
  const [result] = await db.query(
    `INSERT INTO materials (class_id, title, description, file_path, uploaded_by)
     VALUES (?, ?, ?, ?, ?)`,
    [class_id, title, description, file_path, uploaded_by]
  );
  return result.insertId;
};

export const updateMaterial = async (id, data) => {
  const { title, description, file_path } = data;
  await db.query(
    `UPDATE materials SET title = ?, description = ?, file_path = ? WHERE id = ?`,
    [title, description, file_path, id]
  );
};

export const deleteMaterial = async (id) => {
  await db.query(`DELETE FROM materials WHERE id = ?`, [id]);
};

export const findMaterialsByClass = async (classId) => {
  const [rows] = await db.query(
    `SELECT m.*, u.username as uploader_name 
     FROM materials m
     JOIN users u ON m.uploaded_by = u.id
     WHERE class_id = ? ORDER BY created_at DESC`,
    [classId]
  );
  return rows;
};

export const findMaterialById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM materials WHERE id = ?`, [id]);
  return rows[0];
};
