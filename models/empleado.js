'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empleado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Empleado.belongsTo(models.Session,{
        foreignKey:'session_code',
        as:'tipoSesssion_fk'
      }        
      ),
      Empleado.belongsTo(models.Documento,{
        foreignKey:'documento_id',
        as:'tipoDocumento_fk'
      }        
      ),
      Empleado.belongsTo(models.Ciudad,{
        foreignKey:'ciudad_id',
        as:'empleadoCiudad_fk'
      }        
      )
    }
  }
  Empleado.init({
    id_empleado:{
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
    modelName: 'Empleado',
    tableName: 'empleados'
  });
  return Empleado;
};