const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth.controller');

router.get('/', userController.getAllUser);
router.get('/:correo', userController.getAllUserByEmail);
router.post('/', userController.addUser);
router.put('/:correo', userController.updateUser);
router.delete('/:correo', userController.deleteUser);

module.exports=router