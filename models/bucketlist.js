"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BucketList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Couple, {
        as: "couple",
        foreignKey: "coupleId",
      });
    }
  }
  BucketList.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      isCompleted: DataTypes.BOOLEAN,
      date: DataTypes.DATE,
      coupleId: DataTypes.INTEGER,
      location: DataTypes.STRING,
      image: DataTypes.BLOB,
      imageURL: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BucketList",
    }
  );
  return BucketList;
};
