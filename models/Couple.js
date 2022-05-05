'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Couple extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.user, { onDelete: 'cascade' });
    }
  }
  Couple.init(
    {
      girlfriend: DataTypes.INTEGER,
      boyfriend: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Couple',
    }
  );
  return Couple;
};
