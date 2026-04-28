import db from "../../config/db.js";

export const findById = async (id) => {
    const [rows] = await db.query(
        `SELECT u.id, u.email,
                p.first_name, p.last_name, p.avatar_url
        FROM users u
        LEFT JOIN user_profiles p ON u.id = p.user_id
        WHERE u.id = ?`,
        [id]
    );

    return rows[0];
};

export const updateProfile = async (userId, data) => {
    const { first_name, last_name, phone } = data;

    await db.query(
        `UPDATE user_profiles
        SET first_name=?, last_name=?, phone=?
        WHERE user_id=?`,
        [first_name, last_name, phone, userId]
    );
};

export const updateAvatar = async (userId, avatarUrl) => {
    await db.query(
        `UPDATE user_profiles
        SET avatar_url=?
        WHERE user_id=?`,
        [avatarUrl, userId]
    );
};