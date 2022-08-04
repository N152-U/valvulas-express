'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
   return queryInterface.bulkInsert('reasons', [{
    id: 1,
    reason: 'Fuga'.toUpperCase(),
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 2,
    reason: 'Falta de agua'.toUpperCase(),
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 3,
    reason: 'Obra'.toUpperCase(),
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 4,
    reason: 'Otro'.toUpperCase(),
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  
  ]);
  },

  down: async (queryInterface, Sequelize) => {
   
    return queryInterface.bulkDelete('reasons', null, {});
  }
};
