import userRepository from '../repository/user.repository.js';
import db from '../../../database/index.js';
import bcrypt from 'bcryptjs';

class UserService {
  async registerUser(userData) {
    // Example of using transactions for multi-model operations
    const transaction = await db.sequelize.transaction();
    
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = await userRepository.create({
        ...userData,
        password: hashedPassword
      }, { transaction });

      // You could create other related records here...
      // Example: await profileRepository.create({ userId: user.id }, { transaction });

      await transaction.commit();
      
      // Remove password from returned object
      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getAllUsers(pagination) {
    const { limit, offset } = pagination;
    const data = await userRepository.findAndCountAll({
      limit,
      offset,
      attributes: { exclude: ['password'] }
    });
    return data;
  }
}

export default new UserService();
