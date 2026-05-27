import db from "../../../config/db.js";

export const findById = async (id) => {
    const [rows] = await db.query(
        `SELECT u.id, u.username, u.email, u.is_validated, u.is_active,
                r.name as role,
                p.first_name, p.last_name, p.phone, p.avatar_url
         FROM users u
         JOIN roles r ON u.role_id = r.id
         LEFT JOIN user_profiles p ON u.id = p.user_id
         WHERE u.id = ? AND u.is_deleted = FALSE`,
        [id]
    );

    return rows[0];
};

export const updateProfile = async (userId, data) => {
    const fields = [];
    const params = [];

    const allowedFields = ['first_name', 'last_name', 'phone'];
    
    for (const key of allowedFields) {
        if (data[key] !== undefined) {
            fields.push(`${key} = ?`);
            params.push(data[key]);
        }
    }

    if (fields.length === 0) return;

    params.push(userId);
    await db.query(
        `UPDATE user_profiles SET ${fields.join(", ")} WHERE user_id = ?`,
        params
    );
};

export const updateAvatar = async (userId, avatarUrl) => {
    await db.query(
        `UPDATE user_profiles
        SET avatar_url=?
        WHERE user_id=?`,
        [avatarUrl, userId]
    );
};

export const getAcademicRecord = async (studentId) => {
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

    return { grades, goals };
};

export const updateRoleAndValidation = async (userId, roleName, isValidated) => {
    // First get the role id
    const [roles] = await db.query('SELECT id FROM roles WHERE name = ?', [roleName]);
    if (!roles.length) throw new Error(`Role ${roleName} not found`);
    const roleId = roles[0].id;

    await db.query(
        'UPDATE users SET role_id = ?, is_validated = ? WHERE id = ?',
        [roleId, isValidated, userId]
    );
};

export const findAdminUsers = async () => {
    const [rows] = await db.query(
        `SELECT u.id 
         FROM users u 
         JOIN roles r ON u.role_id = r.id 
         WHERE r.name = 'admin' AND u.is_active = TRUE AND u.is_deleted = FALSE`
    );
    return rows;
};