'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('roles_has_permissions', [{
      role_id: 1,
      permission_id: 1,
    },
    {
      role_id: 1,
      permission_id: 2,
    },
    {
      role_id: 1,
      permission_id: 3,
    },
    {
      role_id: 1,
      permission_id: 4,
    },
    {
      role_id: 1,
      permission_id: 5,
    },
    {
      role_id: 1,
      permission_id: 6,
    },
    {
      role_id: 1,
      permission_id: 7,
    },
    {
      role_id: 1,
      permission_id: 8,
    },
    {
      role_id: 1,
      permission_id: 9,
    },
    {
      role_id: 1,
      permission_id: 10,
    },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('roles_has_permissions', null, {});
  }
};
