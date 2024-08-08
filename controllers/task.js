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

// Listar todas las tareas

const getTasks = async (req, res) => {
    // Buscar todas las tareas en mongodb
    try {
        const tasks = await Task.find();

        // Si no hay tareas
        if (!tasks) {
            return res.status(200).send({
                status: 'ok',
                message: 'No se han encontrado tareas',
            });
        }

        // Retornar las tareas
        return res.status(200).send({
            status: 'ok',
            tasks,
        });
    } catch (error) {
        // Retornar error
        return res.status(200).send({
            status: 'error',
            error,
        });
    }
};

const getSpecificTask = async (req, res) => {
    // Parametro de id de usuario en la url
    const taskId = req.params.id;

    // Usuario logeado
    const userIdentity = req.user;

    // Buscar la tarea
    try {
        const taskFound = await Task.findById(taskId);

        // Si no hay tarea encontrada
        if (!taskFound) {
            return res.status(404).send({
                status: 'ok',
                message: 'No se ha encontrado la tarea',
            });
        }

        // Validar que el usuario sea el mismo que el usuario a borrar
        if (
            userIdentity.id != taskFound.user &&
            userIdentity.role !== 'role_admin'
        ) {
            // Si son distintos
            return res.status(401).send({
                status: 'Unauthorized',
                message: 'No estas autorizado a acceder a esta tarea',
            });
        }

        // Retornar la tarea
        return res.status(200).send({
            status: 'ok',
            taskFound,
        });
    } catch (error) {
        // Retornar error

        return res.status(500).send({
            status: 'error',
            error: error.message,
        });
    }
};

module.exports = { createTask, getTasks, getSpecificTask };
