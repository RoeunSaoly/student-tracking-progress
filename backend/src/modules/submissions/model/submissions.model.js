const SubmissionModel = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    student_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    assignment_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    tableName: 'submissions',
    underscored: true
  });

  Submission.associate = (models) => {
    Submission.belongsTo(models.User, { foreignKey: 'student_id', as: 'student' });
    Submission.belongsTo(models.Assignment, { foreignKey: 'assignment_id', as: 'assignment' });
    Submission.hasOne(models.Grade, { foreignKey: 'submission_id', as: 'grade' });
  };

  return Submission;
};

export default SubmissionModel;
