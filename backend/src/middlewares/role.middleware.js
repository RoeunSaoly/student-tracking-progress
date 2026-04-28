export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req.user || !req.user.roles) {
                return res.status(403).json({
                    message: "Access denied: No roles found",
                });
            }

            const hasRole = req.user.roles.some(role =>
                allowedRoles.includes(role)
            );

            if (!hasRole) {
                return res.status(403).json({
                    message: "Access denied: Insufficient permissions",
                });
            }

            next();
        } catch (err) {
            next(err);
        }
    };
};
