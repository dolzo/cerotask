// Dependencias
const express = require('express');
const auth = require('../middleware/auth');
const checkAdminRole = require('../middleware/checkAdminRole');

// Cargar router
const router = express.Router();

// Importar controladores
const user = require('../controllers/user');

// Rutas
router.post('/create-user', user.createUser);
router.post('/login', user.loginUser);
router.get('/users/page/:page', auth, checkAdminRole, user.getUsers);
router.get('/users/:id', auth, checkAdminRole, user.getSpecificUser);
router.put('/update-user/', auth, user.updateUser);
router.delete('/delete/:id', auth, user.deleteUser);

module.exports = router;
