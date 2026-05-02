import * as repo from "./teacher.repository.js";
import * as userRepo from "../users/user.repository.js";

export const getPendingTeachers = async () => {
    return await repo.findPendingTeachers();
};

export const validateTeacher = async (id, isValidated) => {
    const user = await userRepo.findUserById(id);
    if (!user) throw new Error("Teacher not found");
    
    await userRepo.updateUser(id, { is_validated: isValidated });
    return { message: isValidated ? "Teacher approved" : "Teacher rejected" };
};
