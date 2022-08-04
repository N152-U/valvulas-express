'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
   return queryInterface.bulkInsert('roads', [{
    id: 1,
    type: 'Primaria'.toUpperCase(),
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 2,
    type: 'Secundaria'.toUpperCase(),
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },

  
  ]);
  },

  down: async (queryInterface, Sequelize) => {
   
    return queryInterface.bulkDelete('roads', null, {});
  }
};
