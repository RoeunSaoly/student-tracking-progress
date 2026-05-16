import Joi from "joi";

export const messageSchema = Joi.object({
  receiver_id: Joi.number().required(),
  content: Joi.string().required().min(1),
});

export const announcementSchema = Joi.object({
  title: Joi.string().required().max(255),
  content: Joi.string().required(),
});
