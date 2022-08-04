const express = require("express");
const { verifyToken } = require("../middleware/index.js");
const {CatalogController} = require("../controllers/index.js");
const router = express.Router();

/**
 * ROUTER
 * Get All Location.
 * @name GetAllLocations
 * @path {GET} /catalog/location/getAll
 * @code {200} All Locations have been brought.
 * @response {module:ValveLocation.ValveLocation[]} ValveLocation Array of ValveLocationObject.
 * @chain {@link module:MiddlewareIndex.VerifyToken}
 */
router.get("/catalog/location/getAll",verifyToken,CatalogController.getAllLocation);
router.get("/catalog/road/getAll",verifyToken,CatalogController.getAllRoad);
router.get("/catalog/reason/getAll",verifyToken,CatalogController.getAllReason);
router.get("/catalog/diameter/getAll",verifyToken,CatalogController.getAllDiameter);
router.get("/catalog/types/getAll",verifyToken,CatalogController.getAllTypes);
/**
 * ROUTER
 * Get All Municipalities.
 * @name GetAllMunicipalities
 * @path {GET} /municipalities/getAll
 * @code {200} All municipalities have been brought.
 * @response {module:Municipality.Municipality[]} Municipality Array of MunicipalityObject.
 * @chain {@link module:MiddlewareIndex.VerifyToken}
 */
 router.get("/catalog/municipality/getAll", verifyToken, CatalogController.getAllMunicipalities);
 /**
 * ROUTER
 * Get All Settlements.
 * @name GetAllSettlements
 * @path {GET} /settlements/getAll
 * @code {200} All settlements have been brought.
 * @response {module:Settlement.Settlement[]} Settlement Array of SettlementObject.
 * @chain {@link module:MiddlewareIndex.VerifyToken}
 */
router.get("/catalog/settlement/getAll", verifyToken, CatalogController.getAllSettlements);


router.get("/catalog/types/getById/:id", verifyToken, CatalogController.getByIdTypes);
/**
 * ROUTER
 * Get Settlements by Municipality.
 * @name GetSettlementsByMunicipality
 * @path {GET} /settlements/getByMunicipality/:id
 * @code {200} settlements have been brought.
 * @params {Number} :id identifier for Municipality.
 * @response {module:Settlement.Settlement} Settlement SettlementObject.
 * @chain {@link module:MiddlewareIndex.VerifyToken}
 */
 router.get("/catalog/settlement/getByMunicipality/:id", verifyToken, CatalogController.getSettlementsByMunicipality);
/**
 * ROUTER
 * Get Sectors by Municipality.
 * @name GetSectorsByMunicipality
 * @path {GET} /sectors/getByMunicipality/:id
 * @code {200} sectors have been brought.
 * @params {Number} :id identifier for Municipality.
 * @response {module:Sector.Sector Sector SectorObject.
 * @chain {@link module:MiddlewareIndex.VerifyToken}
 */
 router.get("/catalog/sector/getByMunicipality/:id", verifyToken, CatalogController.getSectorsByMunicipality);

 /**
  * ROUTER
  * Get Settlements by Municipality.
  * @name GetSettlementsByMunicipality
  * @path {GET} /settlements/getByMunicipality/:id
  * @code {200} settlements have been brought.
  * @params {Number} :id identifier for Municipality.
  * @response {module:Sector.Sector Sector SectorObject.
  * @chain {@link module:MiddlewareIndex.VerifyToken}
  */
 router.get("/catalog/settlement/getByZipCode/:zipcode", verifyToken, CatalogController.getSettlementsByZipCode);
 
 router.get("/catalog/otherReason/getById/:id", verifyToken, CatalogController.getByIdOtherReason);
 router.get("/catalog/municipality/getAllGeoShape", verifyToken, CatalogController.getAllMunicipalitiesShapes);
 router.get("/catalog/municipality/:municipality_id/:type", verifyToken, CatalogController.getAllBySublayer);

module.exports=router;
