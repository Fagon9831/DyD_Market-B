'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Session.belongsTo(models.Tipo_session,{
        foreignKey:'tipo_id',
        as:'tipoSesssion_fk'
      }        
      )
    }
  }
  Session.init({
    id_session:{
      type:DataTypes.STRING,
      allowNull: false,
            primaryKey: true
    },
    usuario: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    tipo_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Session',
    tableName: 'session'
  });
  return Session;
};