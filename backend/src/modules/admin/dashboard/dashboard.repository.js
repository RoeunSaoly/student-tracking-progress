import db from "../../../config/db.js";

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
