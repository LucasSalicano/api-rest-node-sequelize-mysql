'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Enrollment.belongsTo(models.People, {
        foreignKey: "student_id"
      })
      Enrollment.belongsTo(models.Class, {
        foreignKey: "class_id"
      })
    }
  }
  Enrollment.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Enrollment',
    paranoid: true
  });
  return Enrollment;
};