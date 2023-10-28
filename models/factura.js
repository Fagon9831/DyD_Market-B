'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Factura.belongsTo(models.Pedido,{
        foreignKey:'pedido_id',
        as:'facturaPedido_fk'
      }        
      ),
      Factura.belongsTo(models.Producto,{
        foreignKey:'producto_id',
        as:'facturaProducto_fk'
      }        
      )
    }
  }
  Factura.init({
    id_factura:{
      type:DataTypes.INTEGER,
      allowNull: false,
            primaryKey: true,
            autoIncrement:true
    },
    producto_id: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    pedido_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Factura',
    tableName:'factura_pedido'
  });
  return Factura;
};