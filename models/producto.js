'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Producto.belongsTo(models.Categoria,{
        foreignKey:'cod_categoria',
        as:'productoCategoria_fk'
      }        
      )
    }
  }
  Producto.init({
    id_producto:{
      type:DataTypes.INTEGER,
      allowNull: false,
            primaryKey: true,
            autoIncrement:true
    },
    name_producto: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.STRING,
    cod_categoria: DataTypes.INTEGER,
    inventario:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto',
    tableName:'productos'
  });
  return Producto;
};