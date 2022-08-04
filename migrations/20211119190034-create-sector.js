'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sectors', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      wkbGeometry: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: "wkb_geometry",
        comment: "Coordenadas del sector",
      },
      nomLoc: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "nom_loc",
        comment: "Nombre de la Alcaldia",
      },
      cveSec: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "cve_sec",
        comment: "Clave del Sector",
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "Año",
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: "active",
        comment: "status",
      },
      municipalityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: "municipality_id",
        comment: "Llave foranea de la tabla de municipalities",
      },
      geoShape: {
        type: Sequelize.JSON,
        allowNull: false,
        field: "geo_shape",
        comment: "Shape del Sector",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sectors');
  }
};
