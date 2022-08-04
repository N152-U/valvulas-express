const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Road = sequelize.define('roads', {

    type: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('type', val.toUpperCase());
      },
      unique: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: 'Estatus de la vialidad',
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'created_by',
      comment: 'Llave foranea de la tabla users',
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'updated_by',
      comment: 'Llave foranea de la tabla users',
    },
  }, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Road;
};
