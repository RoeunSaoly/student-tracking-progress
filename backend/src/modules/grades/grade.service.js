import * as repo from "./grade.repository.js";

export const gradeSubmission = async (data) => {
  const exists = await repo.checkSubmissionExists(data.submission_id);
  if (!exists) {
    throw new Error("Submission not found");
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
