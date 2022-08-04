const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Valve = sequelize.define(
        "valves", {
            sectorId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: "sectors_id",
                comment: "Llave foranea de la tabla sectors",
            },
            settlementId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "settlements_id",
                comment: "Llave foranea de la tabla settlements",
            },
            diameterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "diameters_id",
                comment: "Llave foranea de la tabla diameters_type",
            },
            valveTypeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "valves_type_id",
                comment: "Llave foranea de la tabla valves_type",
            },
            valveLocationId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "valves_location_id",
                comment: "Llave foranea de la tabla valves_location",
            },
            roadId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "roads_id",
                comment: "Llave foranea de la tabla roads",
            },
            street: {
                type: DataTypes.STRING,
                allowNull: false,
                set(val) {
                    this.setDataValue('street', val.toUpperCase());
                },
                comment: "Calle donde se encuentra la valvula",
            },
            corner: {
                type: DataTypes.STRING,
                set(val) {
                    this.setDataValue('corner', val.toUpperCase());
                },
                comment: "Esquina donde se encuentra la valvula",
            },
            btwFirstStreet: {
                type: DataTypes.STRING,
                field: "btw_first_street",
                set(val) {
                    this.setDataValue('btwFirstStreet', val.toUpperCase());
                },
                comment: "Entre calle donde se encuentra la valvula",
            },
            btwSecondStreet: {
                type: DataTypes.STRING,
                field: "btw_second_street",
                set(val) {
                    this.setDataValue('btwSecondStreet', val.toUpperCase());
                },
                comment: "Segunda calle donde se encuentra la valvula",
            },
            reference: {
                type: DataTypes.STRING,
                set(val) {
                    this.setDataValue('reference', val.toUpperCase());
                },
                comment: "Referencia sobre la valvula",
            },
            directionClose: {
                type: DataTypes.BOOLEAN,
                field: 'direction_close',
                allowNull: false,
                comment: 'Direccion (Izquierda 0, Derecha 1)',
            },
            latitude: {
                type: DataTypes.FLOAT,
                allowNull: true,
                comment: 'Latitud donde se encuentra la valvula',
            },
            longitude: {
                type: DataTypes.FLOAT,
                allowNull: true,
                comment: 'Latitud donde se encuentra la valvula',
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                comment: 'Estatus de la valvula',
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
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );
    return Valve;
};