'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('valves', 'photos_id');
    },

    down: async(queryInterface, Sequelize) => {
        //await queryInterface.dropTable('valves_register');
    }
};