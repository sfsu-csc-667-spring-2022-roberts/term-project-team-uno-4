"use strict";
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Users", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         username: {
            type: Sequelize.STRING,
         },
         email: {
            type: Sequelize.STRING,
         },
         password: {
            type: Sequelize.STRING,
         },
         wins: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
         },
         losses: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
         },
         photo_path: {
            type: Sequelize.TEXT,
            defaultValue: "",
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Users");
   },
};
