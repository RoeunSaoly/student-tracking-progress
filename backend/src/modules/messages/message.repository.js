import db from "../../config/db.js";

export const createMessage = async (data) => {
  const { sender_id, receiver_id, content } = data;
  const [result] = await db.query(
    `INSERT INTO messages (sender_id, receiver_id, content)
     VALUES (?, ?, ?)`,
    [sender_id, receiver_id, content]
  );
  return result.insertId;
};

export const findMessagesBetweenUsers = async (userId1, userId2) => {
  const [rows] = await db.query(
    `SELECT m.*, s.username as sender_name, r.username as receiver_name 
     FROM messages m
     JOIN users s ON m.sender_id = s.id
     JOIN users r ON m.receiver_id = r.id
     WHERE (m.sender_id = ? AND m.receiver_id = ?) 
        OR (m.sender_id = ? AND m.receiver_id = ?)
     ORDER BY m.created_at ASC`,
    [userId1, userId2, userId2, userId1]
  );
  return rows;
};

export const createAnnouncement = async (data) => {
  const { admin_id, title, content } = data;
  const [result] = await db.query(
    `INSERT INTO announcements (admin_id, title, content)
     VALUES (?, ?, ?)`,
    [admin_id, title, content]
  );
  return result.insertId;
};

export const findAllAnnouncements = async () => {
  const [rows] = await db.query(
    `SELECT a.*, u.username as admin_name 
     FROM announcements a
     JOIN users u ON a.admin_id = u.id
     ORDER BY a.created_at DESC`
  );
  return rows;
};
