import db from "../../../config/db.js";

export const findAllUsers = async ({ search, role, status, page = 1, limit = 10 }) => {
    let query = `
        SELECT u.id, u.username, u.email, u.is_active, u.is_validated, u.is_deleted, u.created_at,
               r.name as role_name
        FROM users u
        JOIN roles r ON u.role_id = r.id
        WHERE u.is_deleted = FALSE
    `;
    const params = [];

    if (search) {
        query += ` AND (u.username LIKE ? OR u.email LIKE ?)`;
        params.push(`%${search}%`, `%${search}%`);
    }

    if (role) {
        query += ` AND r.name = ?`;
        params.push(role);
    }

    if (status !== undefined) {
        query += ` AND u.is_active = ?`;
        params.push(status === 'active' ? 1 : 0);
    }

    query += ` ORDER BY u.created_at DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

    const [rows] = await db.query(query, params);
    return rows;
};

export const findUserById = async (id) => {
    const [rows] = await db.query(
        `SELECT u.*, r.name as role_name
         FROM users u
         JOIN roles r ON u.role_id = r.id
         WHERE u.id = ? AND u.is_deleted = FALSE`,
        [id]
    );
    return rows[0];
};

export const updateUser = async (id, data) => {
    const fields = [];
    const params = [];
    for (const [key, value] of Object.entries(data)) {
        fields.push(`${key} = ?`);
        params.push(value);
    }
    params.push(id);
    await db.query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, params);
};

export const softDeleteUser = async (id) => {
    await db.query(`UPDATE users SET is_deleted = TRUE WHERE id = ?`, [id]);
};

export const getStudentAcademicRecord = async (studentId) => {
    const [grades] = await db.query(
        `SELECT g.*, a.title as assignment_title, c.name as class_name
         FROM grades g
         JOIN submissions s ON g.submission_id = s.id
         JOIN assignments a ON s.assignment_id = a.id
         JOIN classes c ON a.class_id = c.id
         WHERE s.student_id = ?`,
        [studentId]
    );

    const [goals] = await db.query(
        `SELECT *, IF(status = 'completed', 1, 0) as is_completed FROM goals WHERE student_id = ?`,
        [studentId]
    );

    const [enrollments] = await db.query(
        `SELECT c.name, e.enrolled_at, e.status
         FROM enrollments e
         JOIN classes c ON e.class_id = c.id
         WHERE e.student_id = ?`,
        [studentId]
    );

    return { grades, goals, enrollments };
};
