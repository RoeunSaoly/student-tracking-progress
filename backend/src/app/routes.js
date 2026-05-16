import express from 'express';
import authRoutes from '../modules/auth/routes/index.js';
import userRoutes from '../modules/users/routes/index.js';
import classRoutes from '../modules/classes/routes/index.js';
import assignmentRoutes from '../modules/assignments/routes/index.js';
import submissionRoutes from '../modules/submissions/routes/index.js';
import gradeRoutes from '../modules/grades/routes/index.js';
import dashboardRoutes from '../modules/dashboard/routes/index.js';
import materialRoutes from '../modules/materials/routes/index.js';
import goalRoutes from '../modules/goals/routes/index.js';
import messageRoutes from '../modules/messages/routes/index.js';
import studentRoutes from '../modules/students/routes/index.js';
import adminRoutes from '../modules/admin/index.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/classes', classRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/submissions', submissionRoutes);
router.use('/grades', gradeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/materials', materialRoutes);
router.use('/goals', goalRoutes);
router.use('/messages', messageRoutes);
router.use('/students', studentRoutes);
router.use('/admin', adminRoutes);

export default router;
