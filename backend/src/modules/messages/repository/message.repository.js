import db from "../../../config/db.js";

export const createMessage = async (data) => {
  const { sender_id, receiver_id, content, media_url, media_type, reply_to_id } = data;
  const [result] = await db.query(
    `INSERT INTO messages (sender_id, receiver_id, message, media_url, media_type, reply_to_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [sender_id, receiver_id, content || '', media_url || null, media_type || null, reply_to_id || null]
  );
  return result.insertId;
};

export const findMessagesBetweenUsers = async (userId1, userId2) => {
  const [rows] = await db.query(
    `SELECT m.id, m.sender_id, m.receiver_id, m.message as content, m.media_url, m.media_type, m.reply_to_id, m.is_read, m.created_at, s.username as sender_name, r.username as receiver_name,
            rm.message as reply_content, rm.media_url as reply_media_url, rm.media_type as reply_media_type, rs.username as reply_sender_name
     FROM messages m
     JOIN users s ON m.sender_id = s.id
     JOIN users r ON m.receiver_id = r.id
     LEFT JOIN messages rm ON m.reply_to_id = rm.id
     LEFT JOIN users rs ON rm.sender_id = rs.id
     WHERE (m.sender_id = ? AND m.receiver_id = ?) 
        OR (m.sender_id = ? AND m.receiver_id = ?)
     ORDER BY m.created_at ASC`,
    [userId1, userId2, userId2, userId1]
  );
  return rows;
};

export const findRecentConversations = async (userId) => {
  const [rows] = await db.query(
    `SELECT 
       CASE 
         WHEN sender_id = ? THEN receiver_id 
         ELSE sender_id 
       END AS contact_id, 
       MAX(created_at) as last_message_at
     FROM messages
     WHERE sender_id = ? OR receiver_id = ?
     GROUP BY contact_id
     ORDER BY last_message_at DESC`,
    [userId, userId, userId]
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
