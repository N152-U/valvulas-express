/**
 * Delivery Detail Controller
 * @module src/controllers/RoleController
 * @name RoleController
 * @author Andrea Naraly Solis Martinez
 * @requires module:RoleService
 */

const Role = require("../models/Role.js");
const { RoleService, UserService } = require("../services/index.js");
const auth = require("../utils/auth.js");
const APIError = require("../utils/error.js");
const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * CONTROLLER
   * Create Role with permissions.
   * @async
   * @function
   * @name create
   * @description Create Role with permissions.
   * @param {Object} req  The request.
   * @param {Object} res  The response.
   * @param {module:Role.Role} req.body The JSON payload.
   * @param {Function} next Next middleware function.
   * @return {Promise<void>}
   */

  create: async (req, res, next) => {
    try {
      const { body } = req;
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const role = await RoleService.create(decoded.id, body);

      await UserService.registerUserLogByUserID(
        decoded.id,
        role.id,
        1,
        "roles",
        role
      );

      res.status(201).json({ message: "Role created", payload: role });
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
   * Get All Roles.
   * @async
   * @function
   * @name getAll
   * @description Get All Roles.
   * @param req {Object} The request.
   * @param res {Object} The response.
   * @param {Function} next Next middleware function-
   * @return {Promise<void>}
   */
  getAll: async (req, res, next) => {
    try {
      const roles = await RoleService.getAll();
      res.json({ payload: roles });
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
   * Get Roles By Id.
   * @async
   * @function
   * @name getAllByStatus
   * @description Get Roles By Id.
   * @param req {Object} The request.
   * @param req.params.status {Number} The Role Status param.
   * @param res {Object} The response.
   * @param {Function} next Next middleware function.
   * @return {Promise<void>}
   */
  getAllByStatus: async (req, res, next) => {
    try {
      const { status } = req.params;
      const roles = await RoleService.getAllByStatus(status);
      res.json({ payload: roles });
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
   * Get Role By Id.
   * @async
   * @function
   * @name getById
   * @description Get Role By Id.
   * @param req {Object} The request.
   * @param req.params.id {Number} The Role Id param.
   * @param res {Object} The response.
   * @param {Function} next Next middleware function.
   * @return {Promise<void>}
   */
  getById: async (req, res, next) => {
    try {
      const { hash } = req.params;
      const roleName = await RoleService.getById(hash);
      res.json({ payload: roleName });
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
   * Delete Role By Id.
   * @async
   * @function
   * @name deleteOne
   * @description Delete Role By Id.
   * @param {Object} req  The request.
   * @param {Number} req.params.id The Role Id param.
   * @param {Object} res  The response.
   * @param {Function} next Next middleware function.
   * @return {Promise<void>}
   */
  deleteOne: async (req, res, next) => {
    try {
      const { hash } = req.params;
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const deletedRole = await RoleService.deleteOne(hash);
      await UserService.registerUserLogByUserID(
        decoded.id,
        deletedRole.id,
        3,
        "roles",
        deletedRole
      );
      res.status(200).json({ message: "Role has been deleted" });
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
   * Update Role By Id.
   * @async
   * @function
   * @name update
   * @description Update Role with permissions By Id.
   * @param {Object} req  The request.
   * @param {module:Role.Role} req.body The JSON payload.
   * @param {Number} req.params.id The Role Id param.
   * @param {Object} res  The response.
   * @param {Function} next Next middleware function.
   * @return {Promise<void>}
   */
  update: async (req, res, next) => {
    try {
      const { body } = req;
      const { hash } = req.params;
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const updatedRole = await RoleService.update(hash, body,decoded.id);
     

      await UserService.registerUserLogByUserID(
        decoded.id,
        updatedRole.id,
        2,
        "roles",
        updatedRole
      );
      res.status(200).json({
        message: "Role has been updated",
      });
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
