import db from "../../config/db.js";

// User Management
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

// Teacher Approval
export const findPendingTeachers = async () => {
    const [rows] = await db.query(
        `SELECT u.id, u.username, u.email, u.created_at
         FROM users u
         JOIN roles r ON u.role_id = r.id
         WHERE r.name = 'teacher' AND u.is_validated = FALSE AND u.is_deleted = FALSE`
    );
    return rows;
};

// Class Management
export const findAllClasses = async () => {
    const [rows] = await db.query(
        `SELECT c.*, u.username as teacher_name,
               (SELECT COUNT(*) FROM enrollments e WHERE e.class_id = c.id) as student_count
         FROM classes c
         JOIN users u ON c.teacher_id = u.id`
    );
    return rows;
};

export const findClassDetails = async (id) => {
    const [classRows] = await db.query(
        `SELECT c.*, u.username as teacher_name, u.email as teacher_email
         FROM classes c
         JOIN users u ON c.teacher_id = u.id
         WHERE c.id = ?`,
        [id]
    );
    
    if (classRows.length === 0) return null;

    const [studentRows] = await db.query(
        `SELECT u.id, u.username, u.email, e.enrolled_at
         FROM users u
         JOIN enrollments e ON u.id = e.student_id
         WHERE e.class_id = ?`,
        [id]
    );

    return {
        ...classRows[0],
        students: studentRows
    };
};

export const deleteClass = async (id) => {
    await db.query(`DELETE FROM classes WHERE id = ?`, [id]);
};

// Dashboard Stats
export const getSystemStats = async () => {
    const [totalUsers] = await db.query("SELECT COUNT(*) as count FROM users WHERE is_deleted = FALSE");
    const [totalStudents] = await db.query(
        "SELECT COUNT(*) as count FROM users u JOIN roles r ON u.role_id = r.id WHERE r.name = 'student' AND u.is_deleted = FALSE"
    );
    const [totalTeachers] = await db.query(
        "SELECT COUNT(*) as count FROM users u JOIN roles r ON u.role_id = r.id WHERE r.name = 'teacher' AND u.is_deleted = FALSE"
    );
    const [totalClasses] = await db.query("SELECT COUNT(*) as count FROM classes");
    const [totalAssignments] = await db.query("SELECT COUNT(*) as count FROM assignments");
    const [totalSubmissions] = await db.query("SELECT COUNT(*) as count FROM submissions");

    return {
        totalUsers: totalUsers[0].count,
        totalStudents: totalStudents[0].count,
        totalTeachers: totalTeachers[0].count,
        totalClasses: totalClasses[0].count,
        totalAssignments: totalAssignments[0].count,
        totalSubmissions: totalSubmissions[0].count
    };
};

// Activity Logs
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
