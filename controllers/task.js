// Dependencias
const Task = require('../models/task');
const validate = require('../helpers/validate');

// Crear tarea
const createTask = async (req, res) => {
    // Recoger parametros
    const params = req.body;

    // Validar parametros
    try {
        validate.validateTaskCreation(params);
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            message: 'Validacion de creacion de tarea no superada',
        });
    }

    // Guardar tarea en mongodb
    try {
        const task = new Task(params);

        const savedTask = await task.save();

        return res.status(200).send({
            status: 'ok',
            message: 'Tarea guardada',
            savedTask,
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Ha ocurrido un error al guardar la tarea',
            error,
        });
    }
};

module.exports = { createTask };
