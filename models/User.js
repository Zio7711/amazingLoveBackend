"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Couple, {
        foreignKey: "girlfriend",
      });
      this.hasOne(models.Couple, {
        foreignKey: "boyfriend",
      });
      this.hasOne(models.Message, {
        foreignKey: "sender",
      });
      this.hasOne(models.Message, {
        foreignKey: "receiver",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      soulmate: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
