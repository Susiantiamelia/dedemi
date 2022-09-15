'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsToMany(models.User,{ through:models.Users_Course})
      Course.belongsTo(models.Category)
      // define association here
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};