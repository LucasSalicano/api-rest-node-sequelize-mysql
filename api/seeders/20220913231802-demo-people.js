'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('People', [
            {
                name: 'People One',
                active: true,
                email: "peopleone@people.com",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'People Two',
                active: true,
                email: "peopletwo@people.com",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'People Three',
                active: true,
                email: "peoplethree@people.com",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {

    }
};
