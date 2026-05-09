import * as repo from "./grade.repository.js";

export const gradeSubmission = async (data, userId) => {
  const info = await repo.findTeacherBySubmissionId(data.submission_id);
  if (!info) {
    throw new Error("Submission not found");
  }

  if (info.teacher_id !== userId) {
    throw new Error("Unauthorized: Only the class teacher can grade this submission");
  }

  if (data.score > info.max_score) {
    throw new Error(`Score cannot exceed maximum score of ${info.max_score}`);
  }

  const gradeId = await repo.createGrade(data);
  return {
    message: "Submission graded successfully",
    gradeId
  };
};

export const getGradeBySubmission = async (submissionId) => {
  return await repo.findBySubmissionId(submissionId);
};
