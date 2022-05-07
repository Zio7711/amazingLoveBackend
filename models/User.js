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
        foreignKey: "girlfriendId",
      });

      this.hasOne(models.Couple, {
        foreignKey: "boyfriendId",
      });

      this.hasOne(models.User, {
        as: "soulmate",
        foreignKey: "soulmateId",
      });

      this.hasOne(models.Message, {
        foreignKey: "senderId",
      });
      this.hasOne(models.Message, {
        foreignKey: "receiverId",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      soulmateId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
