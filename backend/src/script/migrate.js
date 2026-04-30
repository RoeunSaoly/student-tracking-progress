import mysql from "mysql2/promise";
import fs from "fs";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const runMigration = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true,
    });

    const dbName = process.env.DB_NAME;

    console.log("Connected to MySQL");

    // RESET DB
    await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\`;`);
    await connection.query(`CREATE DATABASE \`${dbName}\`;`);
    await connection.query(`USE \`${dbName}\`;`);

    // RUN SCHEMA
    const sql = fs.readFileSync("./databases/schema.sql", "utf8");
    await connection.query(sql);

    console.log("Schema created");

    // =====================================
    // 🌱 SEED ADMIN USER
    // =====================================

    const password = "admin123"; // change later
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Create admin user
    const [userResult] = await connection.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES (?, ?, ?)`,
      ["admin", "admin@example.com", hashedPassword]
    );

    const adminId = userResult.insertId;

    // 2. Get admin role id
    const [roles] = await connection.query(
      `SELECT id FROM roles WHERE name = 'admin'`
    );

    const roleId = roles[0].id;

    // 3. Assign role
    await connection.query(
      `INSERT INTO user_roles (user_id, role_id)
       VALUES (?, ?)`,
      [adminId, roleId]
    );

    // 4. Create profile
    await connection.query(
      `INSERT INTO user_profiles (user_id, first_name, last_name)
       VALUES (?, ?, ?)`,
      [adminId, "System", "Admin"]
    );

    console.log("Admin user seeded 🚀");
    console.log("Login with:");
    console.log("Email: admin@example.com");
    console.log("Password: admin123");

    await connection.end();
    process.exit(0);

  } catch (err) {
    console.error("Migration error:", err.message);
    process.exit(1);
  }
};

runMigration();