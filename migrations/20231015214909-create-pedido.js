'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pedidos', {
      id_pedido: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      cliente_id: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pedidos');
  }
};