import db from "../../../config/db.js";

export const findActivityLogs = async ({ userId, action, page = 1, limit = 20 }) => {
    let query = `
        SELECT l.*, u.username, u.email
        FROM activity_logs l
        JOIN users u ON l.user_id = u.id
        WHERE 1=1
    `;
    const params = [];

    if (userId) {
        query += ` AND l.user_id = ?`;
        params.push(userId);
    }

    if (action) {
        query += ` AND l.action LIKE ?`;
        params.push(`%${action}%`);
    }

    query += ` ORDER BY l.created_at DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

    const [rows] = await db.query(query, params);
    return rows;
};
