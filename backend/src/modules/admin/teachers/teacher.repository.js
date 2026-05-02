import db from "../../../config/db.js";

export const findPendingTeachers = async () => {
    const [rows] = await db.query(
        `SELECT u.id, u.username, u.email, u.created_at
         FROM users u
         JOIN roles r ON u.role_id = r.id
         WHERE r.name = 'teacher' AND u.is_validated = FALSE AND u.is_deleted = FALSE`
    );
    return rows;
};
