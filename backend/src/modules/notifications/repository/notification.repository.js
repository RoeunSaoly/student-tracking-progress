import db from "../../../config/db.js";



export const createNotification = async (userId, { title, message, type, link = null }) => {
  const [result] = await db.query(
    `INSERT INTO notifications (user_id, title, message, type, link) VALUES (?, ?, ?, ?, ?)`,
    [userId, title, message, type, link]
  );
  return result.insertId;
};

export const findByUserId = async (userId) => {
  const [rows] = await db.query(
    `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50`,
    [userId]
  );
  return rows;
};

export const markAsRead = async (id, userId) => {
  await db.query(
    `UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?`,
    [id, userId]
  );
};

export const markAllAsRead = async (userId) => {
  await db.query(
    `UPDATE notifications SET is_read = TRUE WHERE user_id = ?`,
    [userId]
  );
};

export const deleteNotification = async (id, userId) => {
  await db.query(
    `DELETE FROM notifications WHERE id = ? AND user_id = ?`,
    [id, userId]
  );
};
