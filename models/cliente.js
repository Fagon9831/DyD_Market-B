'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cliente.belongsTo(models.Session,{
        foreignKey:'session_code',
        as:'tipoCSesssion_fk'
      }        
      ),
      Cliente.belongsTo(models.Documento,{
        foreignKey:'documento_id',
        as:'tipoCDocumento_fk'
      }        
      ),
      Cliente.belongsTo(models.Ciudad,{
        foreignKey:'ciudad_id',
        as:'clienteCiudad_fk'
      }        
      )
    }
  }
  Cliente.init({
    id_cliente:{
      type:DataTypes.INTEGER,
      allowNull: false,
            primaryKey: true,
            autoIncrement:true
    },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.INTEGER,
    ciudad_id: DataTypes.INTEGER,
    documento: DataTypes.INTEGER,
    documento_id: DataTypes.INTEGER,
    correo: DataTypes.STRING,
    session_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName:'clientes'
  });
  return Cliente;
};