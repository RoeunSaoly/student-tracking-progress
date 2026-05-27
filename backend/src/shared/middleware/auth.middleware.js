import { verifyAccessToken } from "../../shared/utils/jwt.js";
import db from "../../config/db.js";

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access token required",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyAccessToken(token);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid or expired token",
            });
        }

        const [users] = await db.query(
            'SELECT u.id, u.is_active, u.is_deleted, r.name as role FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = ?', 
            [decoded.id]
        );
        if (users.length === 0) {
            return res.status(401).json({ message: "User no longer exists" });
        }
        if (users[0].is_deleted || !users[0].is_active) {
            return res.status(403).json({ message: "Account is inactive or deleted" });
        }

        req.user = {
            ...decoded,
            role: users[0].role
        };
        next();
    } catch (err) {
        next(err);
    }
};