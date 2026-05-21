import db from "../../../config/db.js";

export const findByEmail = async (email) => {
  const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
  return rows[0];
};

export const findByUsername = async (username) => {
  const [rows] = await db.query(`SELECT * FROM users WHERE username = ?`, [username]);
  return rows[0];
};

export const existsByEmail = async (email) => {
  const [rows] = await db.query(`SELECT 1 FROM users WHERE email = ? LIMIT 1`, [email]);
  return rows.length > 0;
};

export const existsByUsername = async (username) => {
  const [rows] = await db.query(`SELECT 1 FROM users WHERE username = ? LIMIT 1`, [username]);
  return rows.length > 0;
};

export const create = async (userData) => {
  const { id, username, email, password, role } = userData;
  // If id is provided use it, else let DB or service handle it (uuid)
  const [result] = await db.query(
    `INSERT INTO users (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)`,
    [id, username, email, password, role || 'student']
  );
  return { id, username, email, role };
};

export const findAndCountAll = async ({ limit, offset }) => {
  const [rows] = await db.query(`SELECT id, username, email, role, created_at, updated_at FROM users LIMIT ? OFFSET ?`, [limit, offset]);
  const [countRows] = await db.query(`SELECT COUNT(*) as count FROM users`);
  return { rows, count: countRows[0].count };
};
