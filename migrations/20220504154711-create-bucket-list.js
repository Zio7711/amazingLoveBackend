"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BucketLists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      coupleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Couples",
          key: "id",
        },
      },
      location: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.BLOB,
      },
      imageURL: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("BucketLists");
  },
};
