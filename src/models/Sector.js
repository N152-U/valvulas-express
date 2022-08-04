const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Sector = sequelize.define(
    "sectors",
    {
      wkbGeometry: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "wkb_geometry",
        comment: "Coordenadas del sector",
      },
      nomLoc: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "nom_loc",
        comment: "Nombre de la Alcaldia",
      },
      cveSec: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "cve_sec",
        comment: "Clave del Sector",
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Año",
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: "active",
        comment: "status",
      },
      municipalityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "municipality_id",
        comment: "Llave foranea de la tabla de municipalities",
      },
      geoShape: {
        type: DataTypes.JSON,
        allowNull: false,
        field: "geo_shape",
        comment: "Shape del Sector",
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Sector;
};
