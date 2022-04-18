'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("players", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      winStatus: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      order: {
        type: Sequelize.INTEGER,
      },
      cardCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      //Foreign Keys
      gameId: {
        type: Sequelize.INTEGER,
        refrences: {
          model: "games",
          key: "id",
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        refrences: {
          model: "users",
          key: "id",
        }
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('players');
  }
};
