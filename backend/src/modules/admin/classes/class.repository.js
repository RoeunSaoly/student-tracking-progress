import db from "../../../config/db.js";

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
