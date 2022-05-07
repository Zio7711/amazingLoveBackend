"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Couple extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "girlfriend",
        foreignKey: "girlfriendId",
      });

      this.belongsTo(models.User, {
        as: "boyfriend",
        foreignKey: "boyfriendId",
      });

      this.hasMany(models.Message, {
        as: "messages",
        foreignKey: "coupleId",
      });

      this.hasMany(models.BucketList, {
        as: "bucketLists",
        foreignKey: "coupleId",
      });
    }
  }
  Couple.init(
    {
      girlfriendId: DataTypes.INTEGER,
      boyfriendId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Couple",
    }
  );
  return Couple;
};
