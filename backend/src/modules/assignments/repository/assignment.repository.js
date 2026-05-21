import db from "../../../config/db.js";

// Assignments
export const createAssignment = async (data) => {
  const { class_id, title, description, due_date, max_score } = data;
  const [result] = await db.query(
    `INSERT INTO assignments (class_id, title, description, due_date, max_score)
     VALUES (?, ?, ?, ?, ?)`,
    [class_id, title, description, due_date, max_score]
  );
  return result.insertId;
};

export const updateAssignment = async (id, data) => {
  const { title, description, due_date, max_score } = data;
  await db.query(
    `UPDATE assignments 
     SET title = ?, description = ?, due_date = ?, max_score = ?
     WHERE id = ?`,
    [title, description, due_date, max_score, id]
  );
};

export const deleteAssignment = async (id) => {
  await db.query(`DELETE FROM assignments WHERE id = ?`, [id]);
};

export const findAssignmentsByClass = async (classId) => {
  const [rows] = await db.query(
    `SELECT * FROM assignments WHERE class_id = ? ORDER BY created_at DESC`,
    [classId]
  );
  return rows;
};

export const findAssignmentById = async (id) => {
  const [rows] = await db.query(
    `SELECT a.*, c.name as class_name
     FROM assignments a
     JOIN classes c ON a.class_id = c.id
     WHERE a.id = ?`,
    [id]
  );
  return rows[0];
};

export const findAssignmentsForTeacher = async (teacherId) => {
  const [rows] = await db.query(
    `SELECT a.*, c.name as class_name,
     (SELECT COUNT(*) FROM submissions s WHERE s.assignment_id = a.id) as submission_count,
     (SELECT COUNT(*) FROM enrollments e WHERE e.class_id = a.class_id AND e.status = 'active') as total_students
     FROM assignments a
     JOIN classes c ON a.class_id = c.id
     WHERE c.teacher_id = ?
     ORDER BY a.due_date DESC`,
    [teacherId]
  );
  return rows;
};

export const findAssignmentsForStudent = async (studentId) => {
  const [rows] = await db.query(
    `SELECT a.*, c.name as class_name, 
     CASE 
       WHEN g.id IS NOT NULL THEN 'Graded'
       WHEN s.id IS NOT NULL THEN 'Submitted'
       ELSE 'Pending'
     END as status,
     g.score as grade
     FROM assignments a
     JOIN classes c ON a.class_id = c.id
     JOIN enrollments e ON c.id = e.class_id
     LEFT JOIN submissions s ON a.id = s.assignment_id AND s.student_id = ?
     LEFT JOIN grades g ON s.id = g.submission_id
     WHERE e.student_id = ? AND e.status = 'active'
     ORDER BY a.due_date DESC`,
    [studentId, studentId]
  );
  return rows;
};
