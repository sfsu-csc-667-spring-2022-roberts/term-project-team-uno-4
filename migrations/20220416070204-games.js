'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable("games", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      player_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false
      },
      active: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      direction: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      host_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: 'id'
        }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('games');
  }
};
