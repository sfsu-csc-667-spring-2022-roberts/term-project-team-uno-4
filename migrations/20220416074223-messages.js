'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("messages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false
      },
      //Foreign Keys
      userId: {
        type: Sequelize.INTEGER,
        refrences: {
          model: "users",
          key: "id",
        }
      },
      gameId: {
        type: Sequelize.INTEGER,
        refrences: {
          model: "games",
          key: "id",
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  }
};
