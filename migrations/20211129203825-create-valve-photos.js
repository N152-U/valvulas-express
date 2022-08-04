"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "photos",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        data: {
          type: Sequelize.STRING,
          comment: "Diagrama la valvula",
          get(){
              return this.getDataValue("data").toString("utf-8");
          }
      },
        nameFile: {
          type: Sequelize.STRING,
          field: "name_file",
          allowNull: false,
          comment: "Nombre del archivo",
        },
        fileType: {
          type: Sequelize.STRING,
          allowNull: false,
          field: "file_type",
          comment: "Tipo de archivo",
        },
        status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          comment: "Estatus del diagrama de la valvula",
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
    await queryInterface.dropTable("valves_location");
  },
};
