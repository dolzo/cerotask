// Dependencias
const Task = require('../models/task');
const validate = require('../helpers/validate');
const mongoosePagination = require('mongoose-paginate-v2');
const task = require('../models/task');

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
    // Recoger pagina
    const page = parseInt(req.params.page) || 1;

    // Limite de documentos
    const limit = 10;

    // Buscar todas las tareas en mongodb
    try {
        // Configuracion de la paginacion

        const options = {
            page: page,
            limit: limit,
            sort: { created_at: -1 },
        };

        // Buscar las taeas con la paginacion
        const tasks = await Task.paginate({}, options);

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
            totalPages: tasks.totalPages,
            currentPage: tasks.page,
            hasNextPage: tasks.hasNextPage,
            hasPrevPage: tasks.hasPrevPage,
            tasks: tasks.docs,
        });
    } catch (error) {
        // Retornar error
        return res.status(200).send({
            status: 'error',
            error: error.message,
        });
    }
};

// Retornar una tarea en especifico mediante su id

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

// Retornar todas las tareas de un usuario

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

// Actualizar una tarea especifica

const updateTask = async (req, res) => {
    // Recoger parametro de la tarea mediante la url
    const taskId = req.params.id;

    // Recoger el usuario logueado
    const userIdentity = req.user;

    // Recoger los parametros de actualizacion
    const params = req.body;

    // Validar los parametros
    try {
        validate.validateTaskUpdate(params);
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            message: error.message,
        });
    }

    // Buscar y actualizar la tarea

    try {
        const task = await Task.findById(taskId);

        // Validar que solo el usuario que creo la tare o un admin la puedan actualizar
        if (
            task.user != userIdentity.id &&
            userIdentity.role !== 'role_admin'
        ) {
            return res.status(403).send({
                status: 'Unauthorized',
                message: 'No se puede actualizar esta tarea',
            });
        }

        // Actualizar la tarea
        const updatedTask = await Task.findByIdAndUpdate(taskId, params, {
            new: true,
        });

        return res.status(200).send({
            status: 'ok',
            message: 'Se ha actualizado la tarea',
            updatedTask,
        });
    } catch (error) {
        // Retornar error
        return res.status(500).send({
            status: 'error',
            message: error.message,
        });
    }
};

// Metodo para borrar tarea

const deleteTask = async (req, res) => {
    // Obtener datos del usuario logueado
    const userIdentity = req.user;

    // Obtener id de la tarea
    const taskId = req.params.id;

    try {
        // Buscar la tarea
        const task = await Task.findById(taskId);

        // Si la id no coincide con ninguna tarea
        if (!task) {
            return res.status(404).send({
                status: 'ok',
                message: 'No se ha encontrado la tarea solicitada',
            });
        }

        // Validar si el usuario logueado creo la tarea, o un admin
        if (
            task.user != userIdentity.id &&
            userIdentity.role !== 'role_admin'
        ) {
            return res.status(403).send({
                status: 'Unauthorized',
                message: 'No se puede eliminar esta tarea',
            });
        }

        // Borrar tarea
        const deletedTask = await Task.findByIdAndDelete(taskId);

        // Si no hay tarea
        if (deletedTask === null) {
            return res.status(404).send({
                status: 'ok',
                message: 'No se ha encontrado la tarea indicada',
            });
        }

        return res.status(200).send({
            status: 'ok',
            message: 'Tarea eliminada',
            deletedTask,
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: error.message,
        });
    }
};

// Metodo para cambiar el estado de una tarea

const taskState = async (req, res) => {
    // Recibir el usuario logueado
    const userIdentity = req.user;

    // Recibir estado por el body
    const taskStatus = req.body.status;

    // Recibir el id de la tarea de la url
    const taskId = req.params.id;

    // Si el parametro es diferente a un booleano se retorna error
    if (taskStatus !== 'true' && taskStatus !== 'false') {
        return res.status(400).send({
            status: 'error',
            message: 'El valor del parametro de completado no es un booleano',
        });
    }

    // Cambiar estado en mongodb
    try {
        // Buscar la tarea
        const task = await Task.findById(taskId);

        // Si la id no coincide con ninguna tarea
        if (!task) {
            return res.status(404).send({
                status: 'ok',
                message: 'No se ha encontrado la tarea solicitada',
            });
        }

        // Validar si el usuario logueado creo la tarea, o un admin
        if (
            task.user != userIdentity.id &&
            userIdentity.role !== 'role_admin'
        ) {
            return res.status(403).send({
                status: 'Unauthorized',
                message: 'No se puede cambiar el estado de esta tarea',
            });
        }

        // Cambiar el estado de la tarea
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                completed: taskStatus,
            },
            { new: true }
        );

        // Retornar la tarea
        res.status(200).send({
            status: 'ok',
            message: 'Estado actualizado',
            updatedTask,
        });
    } catch (error) {
        // Retornar el error
        return res.status(500).send({
            status: 'error',
            error: error.message,
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    getSpecificTask,
    getUserTasks,
    updateTask,
    deleteTask,
    taskState,
};
