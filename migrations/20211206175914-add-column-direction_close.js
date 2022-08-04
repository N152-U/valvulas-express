'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        queryInterface.addColumn('valves', 'direction_close', {
            type: Sequelize.BOOLEAN
        });
    },

    down: async(queryInterface, Sequelize) => {

    }
};