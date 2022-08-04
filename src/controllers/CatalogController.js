/**
 * Valve Controller
 * @module src/controllers/ValveController
 * @name ValveController
 * @author Andrea Naraly Solis Martinez
 * @requires module:CatalogService
 */

const Valve = require("../models/Valve.js");
const jwt = require("jsonwebtoken");
const { CatalogService } = require("../services/index.js");
const auth = require("../utils/auth.js");
const APIError = require("../utils/error.js");

module.exports = {
 
  getAllLocation: async (req, res, next) => {
    try {
      const location = await CatalogService.getAllLocation();
      res.json({ payload: location });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getAllRoad: async (req, res, next) => {
    try {
      const roads = await CatalogService.getAllRoad();
      res.json({ payload: roads });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getAllReason: async (req, res, next) => {
    try {
      const reasons = await CatalogService.getAllReason();
      res.json({ payload: reasons });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getAllDiameter: async (req, res, next) => {
    try {
      const diameters = await CatalogService.getAllDiameter();
      res.json({ payload: diameters });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },

  getAllTypes: async (req, res, next) => {
    try {
      const types = await CatalogService.getAllTypes();
      res.json({ payload: types });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
   /**
     * CONTROLLER
     * Get All Municipalities.
     * @async
     * @function
     * @name getAllMunicipalities
     * @description Get All Municipalities.
     * @param req {Object} The request.
     * @param res {Object} The response.
     * @param {Function} next Next middleware function-
     * @return {Promise<void>}
     */
    getAllMunicipalities: async(req, res, next) => {
      try {
          const municipalities = await CatalogService.getAllMunicipalities();
          res.json({ payload: municipalities });
      } catch (error) {
        Telegram.setToken(process.env.BOT_TOKEN);
        Telegram.setRecipient(process.env.CHAT_DEV_ID);
        const encodedURI = encodeURI(error);
        Telegram.setMessage(encodedURI);
        Telegram.send();
          process.env.DEBUG ? next(console.trace(error)) : next(error);
      }
  },
  getAllMunicipalitiesShapes: async(req, res, next) => {
    try {
        const municipalities = await CatalogService.getAllMunicipalitiesShapes();
        res.json({ payload: municipalities });
    } catch (error) {
        process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
},
   /**
     * CONTROLLER
     * Get All Settlements.
     * @async
     * @function
     * @name getAllSettlements
     * @description Get All Settlements.
     * @param req {Object} The request.
     * @param res {Object} The response.
     * @param {Function} next Next middleware function-
     * @return {Promise<void>}
     */
    getAllSettlements: async(req, res, next) => {
      try {
          const settlements = await CatalogService.getAllSettlements();
          res.json({ payload: settlements });
      } catch (error) {
        Telegram.setToken(process.env.BOT_TOKEN);
        Telegram.setRecipient(process.env.CHAT_DEV_ID);
        const encodedURI = encodeURI(error);
        Telegram.setMessage(encodedURI);
        Telegram.send();
        process.env.DEBUG ? next(console.trace(error)) : next(error);
      }
  },
  getByIdTypes: async (req, res, next) => {
    try {
      const { id } = req.params;
      const otherReason = await CatalogService.getByIdTypes(id);
      res.json({ payload: otherReason });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getSettlementsByMunicipality: async (req, res, next) => {
    try {
      const { id } = req.params;
      const settlements = await CatalogService.getSettlementsByMunicipality(id);
      res.json({ payload: settlements });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getSectorsByMunicipality: async (req, res, next) => {
    try {
      const { id } = req.params;
      const sectors = await CatalogService.getSectorsByMunicipality(id);
      res.json({ payload: sectors });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getSettlementsByZipCode: async (req, res, next) => {
    try {
      const { zipcode } = req.params;
      const settlements = await CatalogService.getSettlementsByZipCode(zipcode);
      res.json({ payload: settlements });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getByIdOtherReason: async (req, res, next) => {
    try {
      const { id } = req.params;
      const otherReason = await CatalogService.getByIdOtherReason(id);
      res.json({ payload: otherReason });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getAllBySublayer: async (req, res, next) => {
    try {
      const { municipality_id, type } = req.params;
      switch (type) {
        case 'Colonia':
          const settlements = await CatalogService.getSettlementsByMunicipality(municipality_id);
          res.json({ payload: settlements });
          break;
        case 'Sector':
          const sectors = await CatalogService.getSectorsByMunicipality(municipality_id);
          res.json({ payload: sectors });
          break;
      }

    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
};
