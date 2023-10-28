'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branding extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Branding.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,

    },
    quienes_somos: DataTypes.STRING,
    mision: DataTypes.STRING,
    vision: DataTypes.STRING,
    donde_comprar: DataTypes.STRING,
    como_comprar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Branding',
    tableName: 'branding'
  });
  return Branding;
};