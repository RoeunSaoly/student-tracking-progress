const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'teacher', 'student'),
      defaultValue: 'student'
    }
  }, {
    tableName: 'users',
    underscored: true
  });

  User.associate = (models) => {
    // User has many Classes (as a teacher or creator)
    User.hasMany(models.Class, { foreignKey: 'teacher_id', as: 'classes' });
    // User has many Submissions (as a student)
    User.hasMany(models.Submission, { foreignKey: 'student_id', as: 'submissions' });
  };

  return User;
};

export default UserModel;
