/**
 * Role Service
 * @module src/services/RoleService
 * @name RoleService
 * @author Andrea Naraly Solis Martinez
 * @requires module:Role
 * @requires module:RoleHasPermission
 * @requires module:tPostgres
 */

const {
  Municipality,
  Settlement,
  Sector,
  Valve,
  ValveType,
  ValveMovement,
  OtherReason,
  User,
  Diameter,
  ValveLocation,
  Reason,
  Road,
  Photo,
  tPostgres,
} = require("../models/index.js");

const { Sequelize } = require("sequelize");

const { Op } = require("sequelize");

let t;
module.exports = {
  getAllTypes: () => 
    ValveType.findAll({
      attributes: ["id", "type"],
      where: {
        status: true,
      },
    }).then((data) => {
      return data;
    }),

  getAllLocation: () => 
  ValveLocation.findAll({
      attributes: ["id", "location"],
      where: {
        status: true,
      },
    }).then((data) => {
      return data;
    }),
  getAllRoad: () =>
    Road.findAll({
      attributes: ["id", "type"],
      where: {
        status: true,
      },
    }).then((data) => {
      return data;
    }),
  getAllReason: () =>
    Reason.findAll({
      attributes: ["id", "reason"],
      where: {
        status: true,
      },
    }).then((data) => {
      return data;
    }),
  getAllDiameter: () =>
    Diameter.findAll({
      attributes: ["id", "diameter"],
      where: {
        status: true,
      },
    }).then((data) => {
      return data;
    }),
      /**
   * SERVICE
   * Get All Municipalities.
   * @async
   * @function
   * @name getAllMunicipalities
   * @description Get Municipalities by status.
   * @returns { Promise<module:Municipality.Municipality> } - Municipalities.
   */
  getAllMunicipalities: () =>
  Municipality.findAll({
    attributes: ["id", "municipality", "real_id"],
    where: {
      active: true,
    },
  }).then((data) => {
    return data;
  }),
  getAllMunicipalitiesShapes: () =>
  Municipality.findAll({
    attributes: ["municipality", "realId","geoShape"],
    where: {
      active: true,
    },
  }).then((data) => {
    return data;
  }),
    /**
   * SERVICE
   * Get All Settlements.
   * @async
   * @function
   * @name getAllSettlements
   * @description Get Settlements by status.
   * @returns { Promise<module:Settlement.Settlement> } - Settlements.
   */
     getAllSettlements: () =>
     Settlement.findAll({
       attributes: ["id", "settlement", "d_cp"],
       where: {
         status: true,
       },
     }).then((data) => {
       return data;
     }),
     getByIdTypes: (id) =>
     ValveType.findOne({
      attributes: ["id", "type"],
       where: {
         id,
         status: true,
       },
     }).then((data) => {
       return data;
     }),
     
  /**
   * SERVICE
   * Get Settlements.
   * @async
   * @function
   * @name getSettlementsByMunicipality
   * @description Get Settlements by Municipality id.
   * @param {Number} id Municipality Id.
   * @returns { Promise<module:Settlement.Settlement> } - Settlement.
   */
  getSettlementsByMunicipality: async (id) =>
  Settlement.findAll({
    attributes: ["id", "settlement", "zip_code"],
    where: {
      municipalityId: id,
    },
  }).then((data) => {
    return data;
  }),
    /**
   * SERVICE
   * Get Sectors.
   * @async
   * @function
   * @name getSectorsByMunicipality
   * @description Get Sectors by Municipality id.
   * @param {Number} id Municipality Id.
   * @returns { Promise<module:Sector.Sector> } - Sector.
   */
     getSectorsByMunicipality: async (id) =>
     Sector.findAll({
       attributes: ["id", "nom_loc", "cve_sec"],
       where: {
         municipality_id: id,
       },
     }).then((data) => {
       return data;
     }),
     /**
   * SERVICE
   * Get Settlement.
   * @async
   * @function
   * @name getSettlementByMunicipality
   * @description Get Settlement by Municipality id.
   * @param {Number} zipcode Zip Code.
   * @returns { Promise<module:Sector.Sector> } - Sector.
   */
  getSettlementsByZipCode: async (zipcode) =>
  Settlement.findAll({
    attributes: ["id", "settlement", "d_mnpio"],
    where: {
      zip_code: zipcode,
    },
  }).then((data) => {
    return data;
  }),
  getByIdOtherReason: (id) =>
  OtherReason.findOne({
    attributes: ["id", "reason"],
    where: {
      id,
    },
  }).then((data) => {
    return data;
  }),
 
};
