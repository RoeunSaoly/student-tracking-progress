import bcrypt from "bcrypt";
import { connectDB } from "../../config/db.js";

const connection = connectDB();

export const createUserWithRole = async (connection, user, roleName) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const [userResult] = await connection.query(
    `INSERT INTO users (username, email, password_hash)
     VALUES (?, ?, ?)`,
    [user.username, user.email, hashedPassword],
  );

  const userId = userResult.insertId;

  const [roles] = await connection.query(
    `SELECT id FROM roles WHERE name = ?`,
    [roleName],
  );

  const roleId = roles[0].id;

  await connection.query(
    `INSERT INTO user_roles (user_id, role_id)
     VALUES (?, ?)`,
    [userId, roleId],
  );

  await connection.query(
    `INSERT INTO user_profiles (user_id, first_name, last_name)
    VALUES (?, ?, ?)`,
    [userId, user.first_name, user.last_name],
  );

  return userId;
};
