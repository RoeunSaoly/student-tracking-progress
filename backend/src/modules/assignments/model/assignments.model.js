const AssignmentModel = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    due_date: {
      type: DataTypes.DATE
    },
    class_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    tableName: 'assignments',
    underscored: true
  });

  Assignment.associate = (models) => {
    Assignment.belongsTo(models.Class, { foreignKey: 'class_id', as: 'class' });
    Assignment.hasMany(models.Submission, { foreignKey: 'assignment_id', as: 'submissions' });
  };

  return Assignment;
};

export default AssignmentModel;
