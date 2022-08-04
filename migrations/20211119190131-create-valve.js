"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "valves",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        sectorId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "sectors_id",
          comment: "Llave foranea de la tabla sectors",
        },
        settlementId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "settlements_id",
          comment: "Llave foranea de la tabla settlements",
        },
        diameterTypeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "diameters_type_id",
          comment: "Llave foranea de la tabla diameters_type",
        },
        valveTypeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "valves_type_id",
          comment: "Llave foranea de la tabla valves_type",
        },
        valveLocationId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "valves_location_id",
          comment: "Llave foranea de la tabla valves_location",
        },
        roadId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "roads_id",
          comment: "Llave foranea de la tabla roads",
        },
        street: {
          type: Sequelize.STRING,
          allowNull: false,
          comment: "Calle donde se encuentra la valvula",
        },
        corner: {
          type: Sequelize.STRING,
          comment: "Esquina donde se encuentra la valvula",
        },
        btwFirstStreet: {
          type: Sequelize.STRING,
          field: "btw_first_street",
          comment: "Entre calle donde se encuentra la valvula",
        },
        btwSecondStreet: {
          type: Sequelize.STRING,
          field: "btw_second_street",
          comment: "Segunda calle donde se encuentra la valvula",
        },
        reference: {
          type: Sequelize.STRING,
          comment: "Referencia sobre la valvula",
        },
        photoValve: {
          type: Sequelize.BLOB,
          comment: "Diagrama la valvula",
        },
        latitude: {
          type: Sequelize.FLOAT,
          allowNull: true,
          comment: "Latitud donde se encuentra la valvula",
        },
        longitude: {
          type: Sequelize.FLOAT,
          allowNull: true,
          comment: "Latitud donde se encuentra la valvula",
        },
        status: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          comment: "Estatus de la valvula",
        },
        createdBy: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: "created_by",
          comment: "Llave foranea de la tabla users",
        },
        updatedBy: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: "updated_by",
          comment: "Llave foranea de la tabla users",
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "created_at",
        },

        updatedAt: {
          type: Sequelize.DATE,
          field: "updated_at",
        },
      },
      {
        freezeTableName: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("valves_register");
  },
};
