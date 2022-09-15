'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile,{
        foreignKey : "UserId"
      })
      User.belongsToMany(models.Course,{ through:models.Users_Course})
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(el => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(`${el.password}`,salt)
    el.password = hash
    el.role = 'student'
  })
  return User;
};