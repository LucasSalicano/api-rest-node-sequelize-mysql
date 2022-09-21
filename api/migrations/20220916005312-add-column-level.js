'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Level', 'deletedAt', {
            allowNull: true,
            type: Sequelize.DATE
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.removeColumn('Level', 'deletedAt');
    }
};
