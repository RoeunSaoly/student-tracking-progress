const ClassModel = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    teacher_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    tableName: 'classes',
    underscored: true
  });

  Class.associate = (models) => {
    Class.belongsTo(models.User, { foreignKey: 'teacher_id', as: 'teacher' });
    Class.hasMany(models.Assignment, { foreignKey: 'class_id', as: 'assignments' });
  };

  return Class;
};

export default ClassModel;
