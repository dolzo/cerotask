// Dependencias
const express = require('express');
const auth = require('../middleware/auth');

// Cargar router
const router = express.Router();

// Importar controladores
const user = require('../controllers/user');

// Rutas
router.post('/create-user', user.createUser);
router.post('/login', user.loginUser);
router.get('/users', auth, user.getUsers);

module.exports = router;
