import db from "../../config/db.js";

// Student Dashboard Data
export const getEnrolledClasses = async (studentId) => {
  const [rows] = await db.query(
    `SELECT c.*, u.username as teacher_name
     FROM classes c
     JOIN enrollments e ON c.id = e.class_id
     JOIN users u ON c.teacher_id = u.id
     WHERE e.student_id = ? AND e.status = 'active'`,
    [studentId]
  );
  return rows;
};

export const getStudentAssignments = async (studentId) => {
  const [rows] = await db.query(
    `SELECT a.*, c.name as class_name, s.status as submission_status, g.score as grade, s.submitted_at
     FROM assignments a
     JOIN enrollments e ON a.class_id = e.class_id
     JOIN classes c ON a.class_id = c.id
     LEFT JOIN submissions s ON a.id = s.assignment_id AND s.student_id = ?
     LEFT JOIN grades g ON s.id = g.submission_id
     WHERE e.student_id = ? AND e.status = 'active'
     ORDER BY a.due_date ASC`,
    [studentId, studentId]
  );
  return rows;
};

export const getStudentPerformance = async (studentId) => {
  const [rows] = await db.query(
    `SELECT AVG(g.score) as average_grade, COUNT(g.id) as graded_count
     FROM grades g
     JOIN submissions s ON g.submission_id = s.id
     WHERE s.student_id = ?`,
    [studentId]
  );
  return rows[0];
};

export const getStudentGoalStats = async (studentId) => {
  const [rows] = await db.query(
    `SELECT 
      COUNT(*) as total_goals,
      SUM(CASE WHEN is_completed = 1 THEN 1 ELSE 0 END) as completed_goals
     FROM goals
     WHERE student_id = ?`,
    [studentId]
  );
  return rows[0];
};

// Teacher Dashboard Data
export const getTeacherClasses = async (teacherId) => {
  const [rows] = await db.query(
    `SELECT c.*, 
     (SELECT COUNT(*) FROM enrollments e WHERE e.class_id = c.id AND e.status = 'active') as student_count
     FROM classes c
     WHERE c.teacher_id = ?`,
    [teacherId]
  );
  return rows;
};

export const getTeacherStats = async (teacherId) => {
  const [totalStudents] = await db.query(
    `SELECT COUNT(DISTINCT e.student_id) as count
     FROM enrollments e
     JOIN classes c ON e.class_id = c.id
     WHERE c.teacher_id = ? AND e.status = 'active'`,
    [teacherId]
  );

  const [totalAssignments] = await db.query(
    `SELECT COUNT(*) as count
     FROM assignments a
     JOIN classes c ON a.class_id = c.id
     WHERE c.teacher_id = ?`,
    [teacherId]
  );

  const [totalSubmissions] = await db.query(
    `SELECT COUNT(*) as count
     FROM submissions s
     JOIN assignments a ON s.assignment_id = a.id
     JOIN classes c ON a.class_id = c.id
     WHERE c.teacher_id = ?`,
    [teacherId]
  );

  return {
    totalStudents: totalStudents[0].count,
    totalAssignments: totalAssignments[0].count,
    totalSubmissions: totalSubmissions[0].count
  };
};

export const getTeacherRecentSubmissions = async (teacherId) => {
    const [rows] = await db.query(
        `SELECT s.*, u.username as student_name, a.title as assignment_title, c.name as class_name
         FROM submissions s
         JOIN users u ON s.student_id = u.id
         JOIN assignments a ON s.assignment_id = a.id
         JOIN classes c ON a.class_id = c.id
         WHERE c.teacher_id = ?
         ORDER BY s.submitted_at DESC
         LIMIT 10`,
        [teacherId]
    );
    return rows;
};

export const getStudentGradeTrend = async (studentId) => {
  const [rows] = await db.query(
    `SELECT g.score, g.graded_at, a.title as assignment_title
     FROM grades g
     JOIN submissions s ON g.submission_id = s.id
     JOIN assignments a ON s.assignment_id = a.id
     WHERE s.student_id = ?
     ORDER BY g.graded_at ASC`,
    [studentId]
  );
  return rows;
};

export const getAdminStats = async () => {
  const [userStats] = await db.query(
    `SELECT 
      COUNT(*) as total_users,
      SUM(CASE WHEN r.name = 'teacher' THEN 1 ELSE 0 END) as total_teachers,
      SUM(CASE WHEN r.name = 'student' THEN 1 ELSE 0 END) as total_students,
      SUM(CASE WHEN is_validated = 0 AND r.name = 'teacher' THEN 1 ELSE 0 END) as pending_teachers
     FROM users u
     JOIN roles r ON u.role_id = r.id
     WHERE is_deleted = FALSE`
  );

  const [classStats] = await db.query(
    "SELECT COUNT(*) as total_classes FROM classes"
  );

  return {
    ...userStats[0],
    total_classes: classStats[0].total_classes
  };
};

export const getRecentActivities = async (limit = 10) => {
  const [rows] = await db.query(
    `SELECT l.*, u.username 
     FROM activity_logs l
     JOIN users u ON l.user_id = u.id
     ORDER BY l.created_at DESC
     LIMIT ?`,
    [limit]
  );
  return rows;
};
