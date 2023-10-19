'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pedido.belongsTo(models.Cliente,{
        foreignKey:'cliente_id',
        as:'pedidoCliente_fk'
      }        
      )
    }
  }
  Pedido.init({
    id_pedido:{
      type:DataTypes.STRING,
      allowNull: false,
            primaryKey: true,
    },
    cliente_id: DataTypes.STRING,
    fecha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pedido',
    tableName:'pedidos'
  });
  return Pedido;
};