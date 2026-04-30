import db from "../../config/db.js";

export const findPermissionsByRoleId = async (roleId) => {
    const [rows] = await db.query(
        `SELECT p.name
         FROM permissions p
         JOIN role_permissions rp ON p.id = rp.permission_id
         WHERE rp.role_id = ?`,
        [roleId]
    );
    return rows.map(r => r.name);
};

export const findAllPermissions = async () => {
    const [rows] = await db.query("SELECT * FROM permissions");
    return rows;
};
