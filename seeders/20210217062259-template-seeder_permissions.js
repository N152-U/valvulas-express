'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('permissions', [{
    id: 1,
    permission: 'CREATE.ROLE',
    description: 'Permiso para crear roles',
    created_by: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    permission: 'READ.ROLE',
    description: 'Permiso para leer roles',
    created_by: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 3,
    permission: 'UPDATE.ROLE',
    description: 'Permiso para editar roles',
    created_by: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 4,
    permission: 'DELETE.ROLE',
    description: 'Permiso para eliminar roles',
    created_by: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 5,
    permission: 'RESTORE.ROLE',
    description: 'Permiso para restablecer roles',
    created_by: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 6,
    permission: 'CREATE.USER',
    description: 'Permiso para crear usuarios',
    created_by: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 7,
    permission: 'READ.USER',
    description: 'Permiso para leer usuarios',
    created_by: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 8,
    permission: 'UPDATE.USER',
    description: 'Permiso para editar usuarios',
    created_by: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 9,
    permission: 'DELETE.USER',
    description: 'Permiso para eliminar usuarios',
    created_by: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 10,
    permission: 'RESTORE.USER',
    description: 'Permiso para restablecer usuarios',
    created_by: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permissions', null, {});
  }
};
