import * as repo from "./log.repository.js";

export const getActivityLogs = async (filters) => {
    return await repo.findActivityLogs(filters);
};
