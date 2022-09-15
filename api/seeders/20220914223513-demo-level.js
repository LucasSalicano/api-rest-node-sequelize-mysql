'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Level', [
      {
        level_description: 'Teacher',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level_description: 'Student',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        level_description: 'Director',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
