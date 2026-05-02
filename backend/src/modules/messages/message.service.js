import * as repo from "./message.repository.js";

export const sendMessage = async (data) => {
  const messageId = await repo.createMessage(data);
  return { messageId };
};

export const getMessagesBetweenUsers = async (userId1, userId2) => {
  return await repo.findMessagesBetweenUsers(userId1, userId2);
};

export const createAnnouncement = async (data) => {
  const announcementId = await repo.createAnnouncement(data);
  return { announcementId };
};

export const getAnnouncements = async () => {
  return await repo.findAllAnnouncements();
};
