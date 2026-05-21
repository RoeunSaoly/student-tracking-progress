import db from "../../../config/db.js";

// Auto-initialize the notifications table on startup
const initTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        type VARCHAR(50) NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log("🔔 Notifications database table initialized");
  } catch (err) {
    console.error("❌ Failed to initialize notifications table:", err.message);
  }
};

initTable();

export const createNotification = async (userId, { title, message, type }) => {
  const [result] = await db.query(
    `INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)`,
    [userId, title, message, type]
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
