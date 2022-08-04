const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Log = sequelize.define('logs', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'users_id'
    },
    registerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'registers_id'
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['1', '2' ,'3'],
      comment: 'Tipo de acción (1: Creacion, 2: Edicion, 3: Eliminacion)',
    },
    table: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });
  return Log;
};
