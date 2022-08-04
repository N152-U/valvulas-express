const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ValveMovement = sequelize.define('valves_movements', {
    valvesId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'valves_id'
    },
    reasonId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "reasons_id",
      comment: "Llave foranea de la tabla reasons",
    },
    otherReasons: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "other_reasons",
      comment: "Campo de observaciones para otras razones",
    },
    observation: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('observation', val.toUpperCase());
      },
      comment: "Observaciones sobre el registro",
    },
    action: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: 'Accion (Abierto 0, Cerrado 1) ',
    },
    turns:{
      type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Numero de vueltas',
    },
    full: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ['1', '2' ,'3'],
      comment: 'Estatus (1: Completamente Abierto, 2: Flujo Regulado, 3: Completamente Cerrado)',
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
    updatedAt: 'updated_at'
    
  });
  return ValveMovement;
};
