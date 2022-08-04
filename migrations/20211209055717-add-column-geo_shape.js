'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        queryInterface.addColumn('municipalities', 'geo_shape', {
            type: Sequelize.JSONB
        });
    },

    down: async(queryInterface, Sequelize) => {

    }
};