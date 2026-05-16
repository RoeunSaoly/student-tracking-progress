import * as service from "../service/index.js";
import { logActivity } from "../../logs/service/index.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const result = await service.sendMessage({
    ...req.body,
    sender_id: req.user.id
  });
  await logActivity(req.user.id, `Sent a message to user ID: ${req.body.receiver_id}`);
  res.status(201).json(result);
});

export const getConversation = asyncHandler(async (req, res) => {
  const result = await service.getMessagesBetweenUsers(req.user.id, req.params.userId);
  res.json(result);
});

export const createAnnouncement = asyncHandler(async (req, res) => {
  const result = await service.createAnnouncement({
    ...req.body,
    admin_id: req.user.id
  });
  await logActivity(req.user.id, `Created an announcement: ${req.body.title}`);
  res.status(201).json(result);
});

export const getAnnouncements = asyncHandler(async (req, res) => {
  const result = await service.getAnnouncements();
  res.json(result);
});
