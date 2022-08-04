/**
 * Valve Controller
 * @module src/controllers/ValveController
 * @name ValveController
 * @author Andrea Naraly Solis Martinez
 * @requires module:ValveService
 */

const Valve = require("../models/Valve.js");
const jwt = require("jsonwebtoken");
const { ValveService, UserService } = require("../services/index.js");
const auth = require("../utils/auth.js");
const Moment = require('moment'), 
MomentRange = require('moment-range'), 
moment = MomentRange.extendMoment(Moment);
const Telegram = require("../utils/telegram-send-message");

const cURL = require("curly-express");
const APIError = require("../utils/error.js");

module.exports = {
  /**
   * CONTROLLER
   * Create Valve with permissions.
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

  createValve: async (req, res, next) => {
    try {
      const { body } = req;
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const valveCreated = await ValveService.createValve(decoded.id, body);
      if(body.photo)
      {
        const photoValve = await ValveService.uploadPhotos(
            decoded.id,
            valveCreated.id,
            body
          );
          await UserService.registerUserLogByUserID(
            decoded.id,
            photoValve.id,
            1,
            "photos",
            photoValve
          );

      }
      
      
      await UserService.registerUserLogByUserID(
        decoded.id,
        valveCreated.id,
        1,
        "valves",
        valveCreated
      );
      const detail= await ValveService.detailGetByIdValve(valveCreated.id);

      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_ID);

      let msg=`Se ha agregado una nueva válvula ubicada en la alcaldía ${detail["settlement.settlement_municipality.municipality"]}, colonia ${detail["settlement.settlement"]} `;
      if (detail["sector.cve_sec"]!=null)
      {
          msg+=`en el sector ${detail["sector.cve_sec"]} `;
      }
      const encodedURI = encodeURI(msg);
      Telegram.setMessage(encodedURI,"Usuario creador: ",decoded.username);
      Telegram.send();

      res.status(201).json({ message: "Valve created", payload: valveCreated });
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
   * Create Valve with permissions.
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
  createValveMovement: async (req, res, next) => {
    try {
      const { body } = req;
     
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const valveMovementCreated = await ValveService.createValveMovement(
        decoded.id,
        body
      );
      await UserService.registerUserLogByUserID(
        decoded.id,
        valveMovementCreated.id,
        1,
        "valves_movements",
        valveMovementCreated
      );
    
      const detail= await ValveService.detailGetByIdValve(valveMovementCreated.valvesId);

      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_ID);

      let msg=`Se ha agregado un nuevo movimiento en la válvula que se encuentra en la alcaldía ${detail["settlement.settlement_municipality.municipality"]}, colonia ${detail["settlement.settlement"]} `;
      if (detail["sector.cve_sec"]!=null)
      {
          msg+=`en el sector ${detail["sector.cve_sec"]} `;
      }
      let action = valveMovementCreated["action"]?"Cerrado":"Abierto"
      let direction = valveMovementCreated["direction"]?"Derecha":"Izquierda"
      let full = valveMovementCreated["full"]?"Si":"Flujo regulado"
      msg+=`por el usuario ${decoded.firstName}  Con las siguientes caracteristicas: \n•Diámetro: ${detail["diameter.diameter"]} \n•Tipo de red: ${detail["road.type"]} \n•Localización: ${detail["valves_location.location"]} 
      \n•Acción: ${action} \n•Dirección: ${direction} \n•Número de vueltas: ${valveMovementCreated["turns"]} \n•Cerrado completamente: ${full} \n•Observaciones: ${valveMovementCreated["observation"]}`;
      const encodedURI = encodeURI(msg);
      Telegram.setMessage(encodedURI,"Usuario creador: ",decoded.username);
      Telegram.send();

      res.status(201).json({
        message: "Valve Movement created",
        payload: valveMovementCreated,
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
  /**
   * CONTROLLER
   * Get All Valves.
   * @async
   * @function
   * @name getAllValves
   * @description Get All Valves.
   * @param req {Object} The request.
   * @param res {Object} The response.
   * @param {Function} next Next middleware function-
   * @return {Promise<void>}
   */
   getTotalCount: async (req, res, next) => {
    try {
     
      const {offset, limit, municipality, settlement, street,createdAt,sector}=req.query;
      const valvesCount = await ValveService.getTotalCount(offset, limit,municipality, settlement,street, createdAt,sector);
      res.json({ payload: valvesCount });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getTotalCountDaily: async (req, res, next) => {
    try {
      let nowDate = new Date();
      let newDate =
        nowDate.getFullYear() +
        "-" +
        (nowDate.getMonth() + 1) +
        "-" +
        nowDate.getDate()+" 00:00:00.000 +00:00";
      const {offset, limit,valveId,sector,status,reason,action}=req.query;
      const valvesCount = await ValveService.getTotalCountDaily(newDate,offset, limit,valveId,sector,status,reason,action);
      res.json({ payload: valvesCount });
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
   * Get All Valves.
   * @async
   * @function
   * @name getAllValves
   * @description Get All Valves.
   * @param req {Object} The request.
   * @param res {Object} The response.
   * @param {Function} next Next middleware function-
   * @return {Promise<void>}
   */
   getTotalCountMovement: async (req, res, next) => {
    try {
      const { id } = req.params;
      const {offset, limit,createdAt}=req.query;
      const valvesMovementCount = await ValveService.getTotalCountMovement(id, offset, limit,createdAt);
   
      res.json({ payload: valvesMovementCount });
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
   * Delete Valve By Id.
   * @async
   * @function
   * @name deleteOne
   * @description Delete Valve By Id.
   * @param {Object} req  The request.
   * @param {Number} req.params.id The Valve Id param.
   * @param {Object} res  The response.
   * @param {Function} next Next middleware function.
   * @return {Promise<void>}
   */
  deleteOneValve: async (req, res, next) => {
    try {
      const { id } = req.params;
      const valveDeleted = await ValveService.deleteOneValve(id);
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      await UserService.registerUserLogByUserID(
        decoded.id,
        id,
        3,
        "valves",
        valveDeleted
      );
      res.status(200).json({ message: "Valve has been deleted" });
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
   * Get All Valves.
   * @async
   * @function
   * @name getAllValves
   * @description Get All Valves.
   * @param req {Object} The request.
   * @param res {Object} The response.
   * @param {Function} next Next middleware function-
   * @return {Promise<void>}
   */
  getAllValves: async (req, res, next) => {
    try {
      const {offset, limit, municipality, settlement, street,createdAt,sector}=req.query;
      const valves = await ValveService.getAllValves(offset, limit, municipality, settlement,street, createdAt,sector);
      
      res.json({ payload: valves });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send(); 
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getByIdValveMovements: async (req, res, next) => {
    try {
      const { id } = req.params;
      const {offset, limit, createdAt}=req.query;
      const valveMovements = await ValveService.getByIdValveMovements(id,offset, limit,  createdAt);

      res.json({ payload: valveMovements });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
 getBetweenDatesMovements: async (req, res, next) => {
    try {
      const { startDate, endDate } = req.query;
      var fromDate = moment(startDate);
      var toDate = moment(endDate);

      var range = moment().range(fromDate, toDate);
/*       var diff = range.diff('days');
      console.log("range", range); */
      var array = Array.from(range.by('day', { step: 1 }));
      array=array.map(m => m.format('YYYY-MM-DD'))
      const valvesMovements = await ValveService.getBetweenDatesMovements(startDate, endDate);
    

      // this gives an object with dates as keys
const groups_dates = valvesMovements.reduce((groups, movement) => {
  const date = movement.dataValues.date;
  if (!groups[date]) {
    groups[date] = [];
  }
  groups[date].push(movement);
  return groups;
}, {});
// Edit: to add it in the array format instead

const groupArrays = Object.keys(groups_dates).map((date) => {
  return {[date]:groups_dates[date].reduce((groups, movement) => {
    const valves_id = movement.dataValues.valves_id;

    if (!groups[valves_id]) {
      groups[valves_id] = [];
    }
    groups[valves_id].push(movement);
    return groups;
  }, {})};
  
});


      
      res.json({ payload: groupArrays });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },


 
  getByIdMovement: async (req, res, next) => {
    try {
      const { id } = req.params;
      const valves = await ValveService.getByIdMovement(id);
 
      res.json({ payload: valves });
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
   * Update Valve By Id.
   * @async
   * @function
   * @name update
   * @description Update Valve By Id.
   * @param {Object} req  The request.
   * @param {module:Valve.Valve} req.body The JSON payload.
   * @param {Number} req.params.id The Valve Id param.
   * @param {Object} res  The response.
   * @param {Function} next Next middleware function.
   * @return {Promise<void>}
   */
  updateValve: async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const updatedValve = await ValveService.updateValve(id, body,decoded.id);

      if(body.photo)
      {
        const photoValve = await ValveService.updatePhotos(
            decoded.id,
            updatedValve.id,
            body
          );
          await UserService.registerUserLogByUserID(
            decoded.id,
            photoValve.id,
            2,
            "photos",
            photoValve
          );

      }

      await UserService.registerUserLogByUserID(
        decoded.id,
        id,
        2,
        "valves",
        updatedValve
      );
      res.status(200).json({
        message: "Valve has been updated",
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
  updateValveMovement: async (req, res, next) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const updatedValveMovement = await ValveService.updateValveMovement(
        id,
        body,
        decoded.id
      );
      await UserService.registerUserLogByUserID(
        decoded.id,
        id,
        2,
        "valves_movements",
        updatedValveMovement
      );
      res.status(200).json({
        message: "Valve has been updated",
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

  getByIdValve: async (req, res, next) => {
    try {
      const { id } = req.params;
      const valve = await ValveService.getByIdValve(id);
       if(valve.photos[0] != null)
      {valve.photos[0].dataValues.data = valve.photos[0].dataValues.data.toString('utf8');} 
      res.json({ payload: valve });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  detailGetByIdValve: async (req, res, next) => {
    try {
      const { id } = req.params;
      const detailValve = await ValveService.detailGetByIdValve(id);
      
      

      if(detailValve['photos.data'] != null)
      {detailValve['photos.data'] = detailValve['photos.data'].toString('utf8');}
  
      res.json({ payload: detailValve });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  getByTodayValvesMovement: async (req, res, next) => {
    try {
      let nowDate = new Date();
      let newDate =
        nowDate.getFullYear() +
        "-" +
        (nowDate.getMonth() + 1) +
        "-" +
        nowDate.getDate()+" 00:00:00.000 +00:00";
        const {offset, limit,valveId,sector,status,reason,action}=req.query;
    
      const valves = await ValveService.getByTodayValvesMovement(newDate,offset, limit,valveId,sector,status,reason,action);
      res.json({ payload: valves });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },
  deleteOneValveMovement: async (req, res, next) => {
    try {
      const { id } = req.params;
      const valveMovementDeleted = await ValveService.deleteOneValveMovement(
        id
      );
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await UserService.registerUserLogByUserID(
        decoded.id,
        id,
        3,
        "valves_movements",
        valveMovementDeleted
      );
      res.status(200).json({ message: "Valve Movement has been deleted" });
    } catch (error) {
      Telegram.setToken(process.env.BOT_TOKEN);
      Telegram.setRecipient(process.env.CHAT_DEV_ID);
      const encodedURI = encodeURI(error);
      Telegram.setMessage(encodedURI);
      Telegram.send();
      process.env.DEBUG ? next(console.trace(error)) : next(error);
    }
  },

  getAllLocation: async (req, res, next) => {
    try {
      const location = await ValveService.getAllLocation();
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
      const roads = await ValveService.getAllRoad();
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
      const reasons = await ValveService.getAllReason();
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
      const diameters = await ValveService.getAllDiameter();
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
};
