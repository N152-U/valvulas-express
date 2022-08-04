'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('valves_movements', 'direction');
    },

    down: async(queryInterface, Sequelize) => {
    }
};