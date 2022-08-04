'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('municipalities', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      municipality: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Nombre del Municipio o Alcaldia',
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Estatus del Municipio o Alcaldia',
      },
     realId: {
       type: Sequelize.INTEGER,
       allowNull: false,
       field: 'real_id',
     },
    },{
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
      timestamps: true,
      comment: 'Esta tabla contiene solamente las 16 alcaldías de la ciudad de México',
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('municipalities');
  },
};