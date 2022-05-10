'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("players", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      win_status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      order: {
        type: Sequelize.INTEGER,
      },
      card_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      //Foreign Keys
      game_id: {
        type: Sequelize.INTEGER,
        refrences: {
          model: "games",
          key: "id",
        }
      },
      user_id: {
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
