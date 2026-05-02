import * as repo from "./dashboard.repository.js";

export const getAdminDashboard = async () => {
    return await repo.getSystemStats();
};
