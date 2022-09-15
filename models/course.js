'use strict';
let {Op} = require('sequelize')
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
      // define association here
    }
    static searchFunction(search, sort) {
      let option = {}
      option.include = sequelize.models.User
      option.order = [['category', 'DESC']]
      if(search) {
        option.where = {
          name : {
            [Op.iLike] : `%${search}%`
          }
        }
      }
      if(sort) {
        option.where = {
          category : {
            [Op.eq] : sort
          }
        }
      }
      return Course.findAll(option)
    }
    static sortFunction(sort) {
      
    }
  }
  Course.init({
    name: {
      allowNull :false,
      type :DataTypes.STRING,
      validate :{
        notEmpty :{
          msg: "Please fill the name"
        },
        notNull:{
          msg: "Please fill the name"
        }
      }
    },
    description: {
      allowNull :false,
      type: DataTypes.TEXT,
      validate :{
        notEmpty :{
          msg: "Please fill the Description"
        },
        notNull:{
          msg: "Please fill the Description"
        }
      }
    },
    duration: {
        allowNull :false,
        type :DataTypes.INTEGER,
        validate :{
          notEmpty :{
            msg: "Please fill the duration"
          },
          notNull:{
            msg: "Please fill the duration"
          },
          max:{
            args : 120,
            msg : "Duration max 120 minutes"
          },
          min : {
            args : 30,
            msg : "Duration min 30 minutes"
          }
        }
      },
    category: DataTypes.STRING,
    link: {
      allowNull :false,
      type: DataTypes.TEXT,
      validate :{
        notEmpty :{
          msg: "Please Fill the link"
        },
        notNull:{
          msg: "Please Fill the link"
        }, 
        isUrl :{
          msg: "Please Fill the link with url"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};