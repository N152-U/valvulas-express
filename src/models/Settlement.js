/**
 * SettlementService
 * @module src/models/Settlement
 * @name Settlement
 * @author Andrea Naraly Solis Martinez
 * @requires sequelize.DataTypes
 */
 const { DataTypes } = require('sequelize');

 module.exports = (sequelize) => {
   const Settlement = sequelize.define('settlements', {
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      length: 5,
      comment: 'Codigo Postal',
    },
    settlement: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Nombre de la Colonia ',
    },
     municipalityId: {
       
      field: 'municipality_id',
       type: DataTypes.INTEGER,
       allowNull: false,
       comment: 'Llave foranea de la tabla de municipalities',
     },
     d_tipo_asenta: {
       type: DataTypes.STRING,
       allowNull: false,
       comment: 'Tipo de Asentamiento',
     },
     d_mnpio: {
       type: DataTypes.STRING,
       allowNull: false,
       comment: 'Municipio o Alcaldia',
     },
     d_estado: {
       type: DataTypes.STRING,
       allowNull: false,
       comment: 'Estado',
     },
     d_ciudad: {
       type: DataTypes.STRING,
       allowNull: false,
       comment: 'Ciudad',
     },
     d_cp: {
       type: DataTypes.STRING,
       allowNull: false,
       comment: 'Oficina Electoral',
     },
     c_estado: {
       type: DataTypes.STRING,
       allowNull: false,
       comment: 'Clave de Estado',
     },
     c_oficina: {
       type: DataTypes.STRING,
       allowNull: false,
       comment: 'Clave de Oficina',
     },
     c_tipo_asenta: {
       type: DataTypes.STRING,
       allowNull: false,
       comment: 'Clave de Tipo de Asentamiento',
     },
     id_asenta_cpcons: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
     d_zona: {
       type: DataTypes.STRING,
       allowNull: false,
       comment: 'Tipo de Zona',
     },
     c_cve_ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     active: {
       type: DataTypes.BOOLEAN,
       allowNull: false,
       defaultValue: true,
       comment: 'Estatus de la Colonia',
     },
     createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'created_by',
      comment: 'Llave foranea de la tabla users',
    },
   }, {
     freezeTableName: true,
     updatedAt: true,
     timestamps: true,
     comment: 'Esta tabla es una catalogo de Colonias proporcionada por correos de mexico, http://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/Descarga.aspx',
     indexes: [{
       fields: ['zip_code'],
     }, {
       fields: ['municipality_id'],
     }],
   });
   return Settlement;
 };