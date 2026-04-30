import * as repo from "./dashboard.repository.js";

export const getStudentDashboard = async (studentId) => {
  const classes = await repo.getEnrolledClasses(studentId);
  const assignments = await repo.getStudentAssignments(studentId);

  const totalAssignments = assignments.length;
  const submittedAssignments = assignments.filter(a => a.submission_status).length;
  const progressPercentage = totalAssignments > 0 
    ? Math.round((submittedAssignments / totalAssignments) * 100) 
    : 0;

  return {
    summary: {
      totalClasses: classes.length,
      totalAssignments,
      submittedAssignments,
      progressPercentage
    },
    classes,
    assignments
  };
};

export const getTeacherDashboard = async (teacherId) => {
  const classes = await repo.getTeacherClasses(teacherId);
  const stats = await repo.getTeacherStats(teacherId);
  const recentSubmissions = await repo.getTeacherRecentSubmissions(teacherId);

  return {
    stats: {
      totalClasses: classes.length,
      ...stats
    },
    classes,
    recentSubmissions
  };
};
