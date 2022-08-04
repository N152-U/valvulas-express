'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('valves_movements', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      valvesId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'valves_id'
      },
      reasonId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: "reasons_id",
        comment: "Llave foranea de la tabla reasons",
      },
      OtherReasonId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: "other_reasons_id",
        comment: "Llave foranea de la tabla other_reasons",
      },
      observation: {
        type: Sequelize.STRING,
        comment: "Observaciones sobre el registro",
      },
      action: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        comment: 'Accion (Abierto 0, Cerrado 1) ',
      },
      direction: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          comment: 'Direccion (Izquierda 0, Derecha 1)',
      },
      turns:{
        type: Sequelize.INTEGER,
          allowNull: false,
          comment: 'Numero de vueltas',
      },
      full: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        comment: 'Estatus del tipo del motivo',
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
      updatedAt: 'updated_at',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('valves_movements');
  }
};
