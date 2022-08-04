/**
 * DeliveryService
 * @module src/models/Diameter
 * @name Diameter
 * @author Andrea Naraly Solis Martinez
 * @requires sequelize.DataTypes
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Diameter = sequelize.define('diameters', {
    /**
     * Diameter Model
     * @typedef {Object} module:Diameter.Diameter
     * @property {Number} diameter Diameter Length.
     * @property {Boolean} [status=true] Status of Diameter (Optional).
     * @property {Number} createdBy Id of Creator.
     * @property {Number} updatedBy Id of Updator.
     * @property {Timestamp} [timestamps] Timestamps of Diameter.
     *  Show only when getting Diameter  (Optional).
     */

    /**
     * @type {Delivery}
     */

    diameter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      comment: 'Longitud de diametro',
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: 'Estatus del tipo de diametro',
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

  return Diameter;
};
