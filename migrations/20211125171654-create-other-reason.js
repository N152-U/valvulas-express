'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('other_reasons', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Nombre de la razón',
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Estatus del tipo del motivo',
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'created_by',
        comment: 'Llave foranea de la tabla users',
      },
      updatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'updated_by',
        comment: 'Llave foranea de la tabla users',
      },
      createdAt:
      {
        type: Sequelize.DATE,
        field: 'created_at'
      },
  
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    }, {
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('other_reasons');
  }
};
