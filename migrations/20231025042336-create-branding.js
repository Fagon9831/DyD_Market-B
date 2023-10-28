'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Brandings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quienes_somos: {
        type: Sequelize.STRING
      },
      mision: {
        type: Sequelize.STRING
      },
      vision: {
        type: Sequelize.STRING
      },
      donde_comprar: {
        type: Sequelize.STRING
      },
      como_comprar: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Brandings');
  }
};