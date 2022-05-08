'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
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
        playerCount: {
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
        }
      });
    },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('games');
  }
};
