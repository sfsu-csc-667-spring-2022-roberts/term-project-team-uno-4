'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("gameCards", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      discarded: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      //Foreign Keys
      playerId: {
        type: Sequelize.INTEGER,
        refrences: {
          model: "players",
          key: "id",
        }
      },
      gameId: {
        type: Sequelize.INTEGER,
        refrences: {
          model: "games",
          key: "id",
        }
      },
      cardId: {
        type: Sequelize.INTEGER,
        refrences: {
          model: "cards",
          key: "id",
        }
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('gameCards');
  }
};
