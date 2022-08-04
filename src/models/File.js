const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const File = sequelize.define('files', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Nombre del archivo',
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Path del archivo',
      },
      fileType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'file_type',
        comment: 'Tipo de archivo',
      },
      fileSize: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'file_type',
        comment: 'Estatus del permiso',
      },
      sectorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'sector_id'
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Estatus del archivo',
      },

  }, {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return File;
};
