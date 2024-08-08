// Dependencias
const express = require('express');
const auth = require('../middleware/auth');
const checkAdminRole = require('../middleware/checkAdminRole');

// Cargar router
const router = express.Router();

// Importar controladores
const task = require('../controllers/task');

// Rutas
router.post('/create-task', auth, task.createTask);
router.get('/tasks', auth, checkAdminRole, task.getTasks);
router.get('/tasks:id', auth, task.getSpecificTask);

module.exports = router;
