const { Transaction } = require("sequelize");
const sequelizePostgres = require("../utils/postgresClient.js");

const Role = require("./Role.js")(sequelizePostgres);
const Permission = require("./Permission.js")(sequelizePostgres);
const RoleHasPermission = require("./RoleHasPermission.js")(sequelizePostgres);
const User = require("./User.js")(sequelizePostgres);
const ValveMovement = require("./ValveMovement")(sequelizePostgres);
const Valve = require("./Valve")(sequelizePostgres);
const Diameter = require("./Diameter")(sequelizePostgres);
const Municipality = require("./Municipality.js")(sequelizePostgres);
const Settlement = require("./Settlement.js")(sequelizePostgres);
const Reason = require("./Reason")(sequelizePostgres);
const OtherReason = require("./OtherReason")(sequelizePostgres);
const Sector = require("./Sector")(sequelizePostgres);
const ValveType = require("./ValveType")(sequelizePostgres);
const Log = require("./Log")(sequelizePostgres);
const ValveLocation = require("./ValveLocation")(sequelizePostgres);
const Road = require("./Road")(sequelizePostgres);
const Photo = require("./Photo")(sequelizePostgres);
const File = require("./File")(sequelizePostgres);

try {
    //n:m
    Role.belongsToMany(Permission, {
        through: RoleHasPermission,
        foreignKey: "roleId",
        otherKey: "permissionId",
    });

    Permission.belongsToMany(Role, {
        through: RoleHasPermission,
        foreignKey: "permissionId",
        otherKey: "roleId",
    });
    // 1:n
    Log.belongsTo(User, { foreignKey: "userId", });
    User.hasMany(Log, { foreignKey: "userId", });

    //1:1
    Role.hasOne(User, { foreignKey: "roleId" });
    User.belongsTo(Role, { foreignKey: "roleId", as: "roles" });

    // 1:n
    Diameter.belongsTo(User, {
        foreignKey: "createdBy",
        // as: "creator",
    });
    User.hasMany(Diameter, {
        foreignKey: "createdBy",
    });
    // 1:n
    Diameter.belongsTo(User, {
        foreignKey: "updatedBy",
        //  as: "updator",
    });
    User.hasMany(Diameter, {
        foreignKey: "updatedBy",
    });

    Settlement.belongsTo(Municipality, {
        foreignKey: "municipalityId",
        as: "settlement_municipality",
        targetKey: 'realId'
    });

    Municipality.hasMany(Settlement, {
        foreignKey: "municipalityId",
        as: "municipality_has_settlements",
        targetKey: 'realId'
    });

    // 1:n
    Reason.belongsTo(User, {
        foreignKey: "createdBy",
        // as: "creator",
    });
    User.hasMany(Reason, {
        foreignKey: "createdBy",
    });
    // 1:n
    Reason.belongsTo(User, {
        foreignKey: "updatedBy",
        // as: "updator",
    });
    User.hasMany(Reason, {
        foreignKey: "updatedBy",
    });
    // 1:n
    Sector.belongsTo(Municipality, { foreignKey: "municipalityId", targetKey: 'realId' });

    Municipality.hasMany(Sector, { foreignKey: "municipalityId", targetKey: 'realId' });

    // 1:n
    Valve.belongsTo(Sector, { foreignKey: "sectorId" });

    Sector.hasMany(Valve, { foreignKey: "sectorId" });
    // 1:n
    File.belongsTo(Sector, { foreignKey: "sectorId" });

    Sector.hasMany(File, { foreignKey: "sectorId" });
    // 1:n
    Valve.belongsTo(Settlement, { foreignKey: "settlementId" });

    Settlement.hasMany(Valve, { foreignKey: "settlementId" });

    // 1:n
    Valve.belongsTo(Diameter, { foreignKey: "diameterId" });

    Diameter.hasMany(Valve, { foreignKey: "diameterId" });
    // 1:1
    Valve.belongsTo(ValveType, { foreignKey: "valveTypeId" });

    ValveType.hasMany(Valve, { foreignKey: "valveTypeId" });
    // 1:n
    ValveType.belongsTo(User, {
        foreignKey: "createdBy",
        //  as: "creator",
    });
    User.hasMany(ValveType, {
        foreignKey: "createdBy",
    });
    // 1:n
    ValveType.belongsTo(User, {
        foreignKey: "updatedBy",
        //  as: "updator",
    });
    User.hasMany(ValveType, {
        foreignKey: "updatedBy",
    });

    // 1:n
    Valve.belongsTo(User, {
        foreignKey: "createdBy",
        //  as: "creator",
    });
    User.hasMany(Valve, {
        foreignKey: "createdBy",
    });
    // 1:n
    Valve.belongsTo(User, {
        foreignKey: "updatedBy",
        //  as: "updator",
    });
    User.hasMany(Valve, {
        foreignKey: "updatedBy",
    });

    // 1:n
    ValveMovement.belongsTo(Valve, { foreignKey: "valvesId" });

    Valve.hasMany(ValveMovement, { foreignKey: "valvesId" });

    // 1:n
    ValveMovement.belongsTo(Reason, { foreignKey: "reasonId" });

    Reason.hasMany(ValveMovement, { foreignKey: "reasonId" });
    // 1:n
    ValveMovement.belongsTo(User, {
        foreignKey: "createdBy",
        as: "creator",
    });
    User.hasMany(ValveMovement, {
        foreignKey: "createdBy",
    });
    // 1:n
    ValveMovement.belongsTo(User, {
        foreignKey: "updatedBy",
        as: "updator",
    });
    User.hasMany(ValveMovement, {
        foreignKey: "updatedBy",
    });

    // 1:n
    Valve.belongsTo(ValveLocation, { foreignKey: "valveLocationId" });

    ValveLocation.hasMany(Valve, { foreignKey: "valveLocationId" });

    // 1:n
    ValveLocation.belongsTo(User, {
        foreignKey: "createdBy",
        as: "creator",
    });
    User.hasMany(ValveLocation, {
        foreignKey: "createdBy",
       
    });
    // 1:n
    ValveLocation.belongsTo(User, {
        foreignKey: "updatedBy",
        as: "updator",
    });
    User.hasMany(ValveLocation, {
        foreignKey: "updatedBy",
    });

    // 1:n
    Valve.belongsTo(Road, { foreignKey: "roadId" });

    Road.hasMany(Valve, { foreignKey: "roadId" });

    // 1:n
    Road.belongsTo(User, {
        foreignKey: "createdBy",
        as: "creator",
    });
    User.hasMany(Road, {
        foreignKey: "createdBy",
    });
    // 1:n
    Road.belongsTo(User, {
        foreignKey: "updatedBy",
        as: "updator",
    });
    User.hasMany(Road, {
        foreignKey: "updatedBy",
    });

    // 1:n
    Photo.belongsTo(User, {
        foreignKey: "createdBy",
        // as: "creator",
    });
    User.hasMany(Photo, {
        foreignKey: "createdBy",
    });
    // 1:n
    Photo.belongsTo(User, {
        foreignKey: "updatedBy",
        //  as: "updator",
    });
    User.hasMany(Photo, {
        foreignKey: "updatedBy",
    });
    //1:n
    /*  Photo.hasOne(Valve, { foreignKey: "valveId" }); */
    Valve.hasMany(Photo, { foreignKey: "valveId" });
/* 
    ValveMovement.hasMany(OtherReason, { foreignKey: "OtherReasonId" });
 */


    /**
     * Si se necesita dejar de sincronizar las tablas con el sequelize
     * se dispondra a comentar la función .sync()
     * de la conexión a la base de datos correspondiente;
     *
     * En caso de que se necesite modificar alguna tabla se pondra como
     * parametros de la función {alter:true}
     *
     * En caso de que se requiera eliminar la tabla se pondra como
     * parametros de la funcion {force:true}
     */
/* 
     sequelizePostgres
        .sync({ force: true })
        .then(() => {
            // eslint-disable-next-line no-console
            console.log("Connection has been synchronized successfully.");
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.trace(error);
            console.error("Unable to synchronize to the database:", error);
        });  */
    const tPostgres = async() =>
        sequelizePostgres
        .transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        })
        .then();

    module.exports = {
        //tMysql,
        // tMssql,
        tPostgres,
        Role,
        Log,
        Permission,
        RoleHasPermission,
        User,
        ValveMovement,
        Valve,
        Diameter,
        Municipality,
        Settlement,
        Reason,
        OtherReason,
        Sector,
        ValveType,
        ValveLocation,
        Road,
        Photo,
        File,
        sequelizePostgres,
    };
} catch (error) {
    throw new Error(error);
}