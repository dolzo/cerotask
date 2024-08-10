// Dependencias
const Task = require('../models/task');
const validate = require('../helpers/validate');

// Crear tarea

const createTask = async (req, res) => {
    // Recoger parametros
    const params = req.body;

    // Recoger datos del usuario
    const userIdentity = req.user;

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

        // En el caso de que se quiera asignar la tarea a un usuario distinto al del jwt, se retorna error
        if (task.user != userIdentity.id) {
            return res.status(400).send({
                status: 'error',
                message:
                    'No se puede asignar esta tarea a un usuario diferente al logeado',
            });
        }

        // Guardar la tarea
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
            error: error.message,
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
            error: error.message,
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

const getUserTasks = async (req, res) => {
    // Recoger parametro del usuario de la url
    const userId = req.params.id;

    // Recoger el usuario logueado
    const userIdentity = req.user;

    // Verificar que el usuario sea de las tareas sea aquel logueado, o que tenga rol de admin
    if (userId != userIdentity.id && userIdentity.role != 'role_admin') {
        return res.status(403).send({
            status: 'error',
            message: 'Acceso no autorizado',
        });
    }

    // Hacer consulta en la base de datos
    try {
        const userTasks = await Task.find({ user: userId });

        // retornar tareas del usuario
        return res.status(200).send({
            status: 'ok',
            userTasks,
        });
    } catch (error) {
        // Retornar error
        return res.status(500).send({
            status: 'error',
            error: error.message,
        });
    }
};

module.exports = { createTask, getTasks, getSpecificTask, getUserTasks };
