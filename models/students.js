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


//ganti dateofbirth ke type date (opti ke 1)
//benerin id biar ga kosong (opti ke 2)
//benerin studentId biar ga double (opti ke 3)