// Dependencias
const express = require('express');

// Cargar router
const router = express.Router();

// Importar controladores
const user = require('../controllers/user');

// Rutas
router.post('/create-user', user.createUser);
router.post('/login', user.loginUser);

module.exports = router;
