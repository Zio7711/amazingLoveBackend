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
        foreignKey: "girlfriend",
      });

      this.belongsTo(models.User, {
        foreignKey: "boyfriend",
      });

      this.hasMany(models.Message, {
        foreignKey: "couple",
      });

      this.hasMany(models.BucketList, {
        foreignKey: "couple",
      });
    }
  }
  Couple.init(
    {
      girlfriend: DataTypes.INTEGER,
      boyfriend: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Couple",
    }
  );
  return Couple;
};
