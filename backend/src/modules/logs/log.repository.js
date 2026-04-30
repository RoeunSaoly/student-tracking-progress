import db from "../../config/db.js";

export const createLog = async (userId, action) => {
  await db.query(
    "INSERT INTO activity_logs (user_id, action) VALUES (?, ?)",
    [userId, action]
  );
};
