'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
   return queryInterface.bulkInsert('valves_location', [{
    id: 1,
    location: 'Arroyo'.toUpperCase(),
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 2,
    location: 'Camellon'.toUpperCase(),
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 3,
    location: 'Banqueta'.toUpperCase(),
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 4,
    location: 'Parques y Areas Verdes'.toUpperCase(),
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  
  ]);
  },

  down: async (queryInterface, Sequelize) => {
   
    return queryInterface.bulkDelete('valves_location', null, {});
  }
};
