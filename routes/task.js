// Dependencias
const express = require('express');
const auth = require('../middleware/auth');

// Cargar router
const router = express.Router();

// Importar controladores
const task = require('../controllers/task');

// Rutas
router.post('/create-task', auth, task.createTask);

module.exports = router;
