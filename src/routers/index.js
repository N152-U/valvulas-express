const express = require('express');
const AuthRouter = require('./AuthRouter.js');
const RoleRouter = require('./RoleRouter.js');
const PermissionRouter = require('./PermissionRouter.js');
const ValveRouter = require('./ValveRouter');
const CatalogRouter = require('./CatalogRouter');

const router = express.Router();

router.use(AuthRouter);
router.use(RoleRouter);
router.use(PermissionRouter);
router.use(ValveRouter);
router.use(CatalogRouter);

module.exports = router;
