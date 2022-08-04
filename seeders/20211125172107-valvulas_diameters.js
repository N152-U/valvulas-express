'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
   return queryInterface.bulkInsert('diameters', [{
    id: 1,
    diameter: 3,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 2,
    diameter: 4,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 3,
    diameter: 6,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 4,
    diameter: 8,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 5,
    diameter: 10,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 6,
    diameter: 12,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 7,
    diameter: 20,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 8,
    diameter: 36,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },
  {
    id: 9,
    diameter: 48,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 1,
  },

  
  ]);
  },

  down: async (queryInterface, Sequelize) => {
   
    return queryInterface.bulkDelete('diameters', null, {});
  }
};
