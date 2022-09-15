'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Enrollment', [
            {
                status: true,
                Student_id: 2,
                class_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                status: true,
                Student_id: 3,
                class_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
    }
};
