const express = require('express');
const { UserValidator } = require('../validators/index.js');
const { UserController } = require('../controllers/index.js');
const { verifyToken, roleHasPermissions } = require('../middleware/index.js');
const router = express.Router();


router.get('/user/:username/permissions', verifyToken, roleHasPermissions('READ.ROLE'), UserController.getAllPermissionsByUsername);
router.post('/user/signup', verifyToken, UserValidator.signup, roleHasPermissions('CREATE.USER'), UserController.signup);
router.post('/user/login', UserValidator.login, UserController.login);
router.get('/user/getAll', verifyToken, roleHasPermissions('READ.USER'), UserController.getAll);
router.get('/user/getById/:hash', verifyToken, roleHasPermissions('READ.USER'), UserController.getById);
router.put('/user/update/:hashUser', verifyToken, UserValidator.update, roleHasPermissions('UPDATE.USER'), UserController.update);
router.delete('/user/delete/:hash', verifyToken, roleHasPermissions('DELETE.USER'), UserController.deleteOne);

module.exports = router;