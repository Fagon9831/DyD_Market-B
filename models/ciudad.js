'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ciudad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ciudad.init({
    id_ciudad:{
      type:DataTypes.INTEGER,
      allowNull: false,
            primaryKey: true,
            autoIncrement:true
    },
    ciudad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ciudad',
    tableName: 'ciudades'
  });
  return Ciudad;
};