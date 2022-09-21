'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Class', 'deletedAt', {
            allowNull: true,
            type: Sequelize.DATE
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Class', 'deletedAt');
    }
};
