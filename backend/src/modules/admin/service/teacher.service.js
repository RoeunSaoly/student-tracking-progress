import * as repo from "../repository/teacher.repository.js";
import * as userRepo from "../repository/user.repository.js";
import { addNotification } from "../../notifications/service/notification.service.js";

export const getPendingTeachers = async () => {
    return await repo.findPendingTeachers();
};

export const validateTeacher = async (id, isValidated) => {
    const user = await userRepo.findUserById(id);
    if (!user) throw new Error("Teacher not found");
    
    if (isValidated) {
        await userRepo.updateUser(id, { is_validated: true });
        
        // Notify the teacher that their account is activated
        try {
            await addNotification(id, {
                title: "Account Approved 🚀",
                message: "Congratulations! Your teacher registration request has been approved by the admin. You now have full dashboard access.",
                type: "system"
            });
        } catch (notificationErr) {
            console.error("Failed to create approval notification", notificationErr);
        }
    } else {
        await userRepo.softDeleteUser(id);
    }
    
    return { message: isValidated ? "Teacher approved" : "Teacher rejected" };
};
