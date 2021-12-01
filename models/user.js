'use strict';
const { encode } = require('../helpers/bcryct')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: { msg: "Wrong Format Email" },
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email cant be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 25],
          msg: "Min password length is 8"
        },
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password cant be empty"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username is required"
        },
        notEmpty: {
          msg: "Username cant be empty"
        }
      }
    },
    fullname: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = encode(user.password)
      },
      beforeBulkUpdate(user) {
        if (user.attributes.password.length < 25) {
          user.attributes.password = encode(user.attributes.password)
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};