// Dependencias
const express = require('express');

// Cargar router
const router = express.Router();

// Importar controladores
const task = require('../controllers/task');

// Rutas
router.post('/create-task', task.createTask);

module.exports = router;
