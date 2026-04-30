import db from "../../config/db.js";

export const findByEmail = async (email) => {
    const [rows] = await db.query(
        `SELECT u.*, r.name as role_name
         FROM users u
         JOIN roles r ON u.role_id = r.id
         WHERE u.email = ?`,
        [email]
    );
    return rows[0];
};

export const createUser = async ({ email, username, password_hash, role_id }) => {
    const [result] = await db.query(
        "INSERT INTO users (email, username, password_hash, role_id) VALUES (?, ?, ?, ?)",
        [email, username, password_hash, role_id]
    );
    return result.insertId;
};

export const findRoleIdByName = async (roleName) => {
    const [rows] = await db.query("SELECT id FROM roles WHERE name = ?", [roleName]);
    return rows[0] ? rows[0].id : null;
};

export const findById = async (id) => {
    const [rows] = await db.query(
        `SELECT u.*, r.name as role_name
         FROM users u
         JOIN roles r ON u.role_id = r.id
         WHERE u.id = ?`,
        [id]
    );
    return rows[0];
};

export const saveRefreshToken = async (userId, token, expiresAt) => {
    await db.query(
        "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
        [userId, token, expiresAt]
    );
};

export const findRefreshToken = async (token) => {
    const [rows] = await db.query(
        "SELECT * FROM refresh_tokens WHERE token = ? AND revoked = FALSE AND expires_at > NOW()",
        [token]
    );
    return rows[0];
};

export const revokeRefreshToken = async (token) => {
    await db.query(
        "UPDATE refresh_tokens SET revoked = TRUE WHERE token = ?",
        [token]
    );
};