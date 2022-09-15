'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User,{
        foreignKey : "UserId"
      })
      // define association here
    }
    getDate() {
      let convertDate = this.dateOfBirth.toISOString().slice(0,10)
      return convertDate
    }
    get changeFormat() {
      const format = { day: "numeric", month: "long", year: "numeric" };
      const date = this.dateOfBirth.toLocaleDateString('id-ID', format);
      return date;
    }
  }
  Profile.init({
    fullName: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Full Name Cannot Be Empty'
        }
      }
    },
    dateOfBirth: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Please Insert Your BirthDay!'
        }
      }
    },
    adress: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Please Insert Your Address'
        }
      }
    },
    background: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Please tell us your background'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};