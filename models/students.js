'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      students.hasOne(models.scores, { foreignKey: "idStudents", as: "Scores" });
    }
  };
  students.init({
    name: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING, 
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'students',
  });
  return students;
};