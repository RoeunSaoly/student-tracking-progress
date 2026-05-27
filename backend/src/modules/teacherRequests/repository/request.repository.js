import db from "../../../config/db.js";

export const createTeacherRequest = async (requestData) => {
    const {
        user_id, phone, degree, major, university, graduation_year,
        experience_years, previous_workplace, subjects, documents
    } = requestData;

    const [result] = await db.query(
        `INSERT INTO teacher_requests 
        (user_id, phone, degree, major, university, graduation_year, experience_years, previous_workplace, subjects, documents) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            user_id, phone, degree, major, university, graduation_year,
            experience_years, previous_workplace, JSON.stringify(subjects), JSON.stringify(documents)
        ]
    );

    return result.insertId;
};

export const findRequestByUserId = async (userId) => {
    const [rows] = await db.query(
        `SELECT * FROM teacher_requests WHERE user_id = ? ORDER BY created_at DESC LIMIT 1`,
        [userId]
    );
    return rows[0];
};

export const findAllPendingRequests = async () => {
    const [rows] = await db.query(
        `SELECT tr.*, u.username, u.email, up.first_name, up.last_name, up.avatar_url 
         FROM teacher_requests tr
         JOIN users u ON tr.user_id = u.id
         LEFT JOIN user_profiles up ON u.id = up.user_id
         WHERE tr.status = 'pending'
         ORDER BY tr.created_at ASC`
    );
    return rows;
};

export const findRequestById = async (id) => {
    const [rows] = await db.query(
        `SELECT tr.*, u.username, u.email, up.first_name, up.last_name, up.avatar_url 
         FROM teacher_requests tr
         JOIN users u ON tr.user_id = u.id
         LEFT JOIN user_profiles up ON u.id = up.user_id
         WHERE tr.id = ?`,
        [id]
    );
    return rows[0];
};

export const updateRequestStatus = async (id, status, adminNote, adminId) => {
    await db.query(
        `UPDATE teacher_requests 
         SET status = ?, admin_note = ?, reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [status, adminNote, adminId, id]
    );
};
