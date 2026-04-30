import Joi from "joi";

export const assignmentSchema = Joi.object({
  class_id: Joi.number().required(),
  title: Joi.string().required().max(255),
  description: Joi.string().allow("", null),
  due_date: Joi.date().required(),
  max_score: Joi.number().default(100),
});

export const updateAssignmentSchema = Joi.object({
  title: Joi.string().max(255),
  description: Joi.string().allow("", null),
  due_date: Joi.date(),
  max_score: Joi.number(),
});

export const submissionSchema = Joi.object({
  assignment_id: Joi.number().required(),
  file_path: Joi.string().required(),
});

export const gradeSchema = Joi.object({
  grade: Joi.number().min(0).required(),
  feedback: Joi.string().allow("", null),
});
