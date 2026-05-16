const GradeModel = (sequelize, DataTypes) => {
  const Grade = sequelize.define('Grade', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    feedback: {
      type: DataTypes.TEXT
    },
    submission_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'grades',
    underscored: true
  });

  Grade.associate = (models) => {
    Grade.belongsTo(models.Submission, { foreignKey: 'submission_id', as: 'submission' });
  };

  return Grade;
};

export default GradeModel;
