const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OtherReason = sequelize.define('other_reasons', {
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('reason', val.toUpperCase());
      },
      unique: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: 'Estatus del tipo del motivo',
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

  return OtherReason;
};
