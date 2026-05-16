import Joi from "joi";

export const goalSchema = Joi.object({
  title: Joi.string().required().max(255),
  target_date: Joi.date().required(),
});

export const updateGoalSchema = Joi.object({
  title: Joi.string().max(255),
  target_date: Joi.date(),
  status: Joi.string().valid("pending", "in_progress", "completed"),
});
