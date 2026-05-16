import * as repo from "../repository/index.js";

export const getStudentDashboard = async (studentId) => {
  const classes = await repo.getEnrolledClasses(studentId);
  const assignments = await repo.getStudentAssignments(studentId);
  const performance = await repo.getStudentPerformance(studentId);
  const goalStats = await repo.getStudentGoalStats(studentId);
  const gradeTrend = await repo.getStudentGradeTrend(studentId);

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
      progressPercentage,
      averageGrade: performance.average_grade ? parseFloat(performance.average_grade).toFixed(2) : "N/A",
      goalsCompleted: `${goalStats.completed_goals || 0}/${goalStats.total_goals || 0}`
    },
    performance: {
      ...performance,
      goalCompletionRate: goalStats.total_goals > 0 
        ? Math.round((goalStats.completed_goals / goalStats.total_goals) * 100)
        : 0,
      gradeTrend
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

export const getAdminDashboard = async () => {
  const stats = await repo.getAdminStats();
  const recentActivities = await repo.getRecentActivities();

  return {
    stats,
    recentActivities
  };
};
