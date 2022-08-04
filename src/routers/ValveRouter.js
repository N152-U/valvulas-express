/**
 * Valve Routers
 * @module src/routers/ValveRouter
 * @name ValveRouter
 * @author Andrea Naraly Solis Martinez
 * @requires express
 * @requires module:ValveController
 */

const express = require("express");
const { ValveValidator } = require("../validators/index.js");
const { ValveController } = require("../controllers/index.js");
const { verifyToken, roleHasPermissions } = require("../middleware/index.js");

const router = express.Router();
/**
 * ROUTER
 * Create Valve 
 * @name CreateValve
 * @path {POST} /valve/create
 * @code {201} Valve has been created.
 * @body {module:Valve.Valve} Valve ValveObject.
 * @response {module:Valve.Valve} Valve ValveObject.
 * @chain {@link module:MiddlewareIndex.VerifyToken}
 */
 router.post('/valve/create', verifyToken, ValveValidator.createValve, ValveController.createValve);
 router.post('/valve/movement/create', verifyToken, ValveValidator.createMovement,ValveController.createValveMovement);
 router.delete('/valve/delete/:id', verifyToken, ValveController.deleteOneValve);
 router.delete('/valve/movement/delete/:id', verifyToken, ValveController.deleteOneValveMovement);
 router.get("/valve/movement/getBetweenDates", verifyToken,  ValveController.getBetweenDatesMovements);
 router.get("/valve/getAll", verifyToken, ValveController.getAllValves);
 router.put('/valve/update/:id', verifyToken, ValveValidator.updateValve, ValveController.updateValve);
 router.put('/valve/movement/update/:id', verifyToken,ValveValidator.updateMovement, ValveController.updateValveMovement);
 router.get("/valve/getById/:id", verifyToken, ValveController.getByIdValve);
 router.get("/valve/detailGetById/:id", verifyToken, ValveController.detailGetByIdValve);

 router.get("/valve/movement/getByToday", verifyToken, ValveController.getByTodayValvesMovement);
 router.get("/valve/movement/getTotalCountDaily", verifyToken, ValveController.getTotalCountDaily);


 router.get("/valve/:id/movement/getAll", verifyToken, ValveController.getByIdValveMovements);
 router.get("/valve/movement/getById/:id", verifyToken, ValveController.getByIdMovement);
 router.get("/valve/getTotalCount", verifyToken, ValveController.getTotalCount);
 router.get("/valve/:id/movement/getTotalCount", verifyToken, ValveController. getTotalCountMovement);


module.exports = router;