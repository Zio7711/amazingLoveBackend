'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Couples', {
      _id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      girlfriend: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: '_id',
        },
      },

      boyfriend: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: '_id',
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Couples');
  },
};
