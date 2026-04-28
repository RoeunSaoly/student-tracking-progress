import db from "../../config/db.js";

export const findByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
    return rows[0];
};

export const createUser = async ({ email, username, password_hash }) => {
    const [result] = await db.query(
        "INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)",
        [email, username, password_hash]
    );
    return result.insertId;
};