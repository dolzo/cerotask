// Dependencias
const validator = require('validator');

// Validar creacion de usuario
const validateUserCreation = (params) => {
    // Validar nombre
    let name =
        !validator.isEmpty(params.name) &&
        validator.isLength(params.name, { min: 3, max: undefined }) &&
        validator.isAlpha(params.name, 'es-ES');

    // Validar apellido
    let surname =
        !validator.isEmpty(params.surname) &&
        validator.isLength(params.surname, { min: 2, max: undefined }) &&
        validator.isAlpha(params.surname, 'es-ES');

    // Validar email
    let email =
        !validator.isEmpty(params.email) && validator.isEmail(params.email);

    // Validar contrasenia
    // Longitud >= 8 - Minimo de 1 minuscula - 1 mayuscula - 1 numero
    let password =
        !validator.isEmpty(params.password) &&
        validator.isStrongPassword(params.password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        });

    // Comprobar si todo anda bien
    if (!name || !surname || !email || !password) {
        throw new Error('No se ha superado la validacion del registro');
    }
};

// Validar datos login
const validateLogin = (params) => {
    // Validar email
    let email =
        !validator.isEmpty(params.email) && validator.isEmail(params.email);
    let password = !validator.isEmpty(params.password);

    if (!email) {
        throw new Error('No se ha superado la validacion del login');
    }
};

// Validar datos update
const validateUpdateUser = (params) => {
    // Validar nombre
    let name =
        validator.isLength(params.name, { min: 3, max: undefined }) &&
        validator.isAlpha(params.name, 'es-ES');

    // Validar apellido
    let surname =
        validator.isLength(params.surname, { min: 2, max: undefined }) &&
        validator.isAlpha(params.surname, 'es-ES');

    // Validar email
    let email = true;

    // Validar contrasenia
    let password = validator.isStrongPassword(params.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    });

    // Comprobar si todo anda bien
    if (!name || !surname || !email || !password) {
        throw new Error('No se ha superado la validacion del registro');
    }
};

// Validar crecion de tarea
const validateTaskCreation = (params) => {
    // Validar titulo
    let title =
        !validator.isEmpty(params.title) &&
        validator.isLength(params.title, { min: 1, max: 128 });

    // Validar descripcion
    let description =
        !validator.isEmpty(params.description) &&
        validator.isLength(params.description, { min: 1, max: 1024 });

    // Comprobar si todo anda bien
    if (!title || !description) {
        throw new Error('Validacion de la tarea no superada');
    }
};

// Validar actualizacion de una tarea
const validateTaskUpdate = (params) => {
    const titleParam = params.title;
    const descripcionParam = params.descripcion;

    if (!titleParam && !descripcionParam) {
        throw new Error('No se han entregado parametros para actualizar');
    }

    // Validar titulo
    if (params.title) {
        let title = validator.isLength(params.title, { min: 1, max: 128 });
        if (!title) {
            throw new Error('El titulo no es valido');
        }
    }

    // Validar descripcion
    if (params.description) {
        let description = validator.isLength(params.description, {
            min: 1,
            max: 1024,
        });
        if (!description) {
            throw new Error('La descripcion no es valida');
        }
    }
};

module.exports = {
    validateUserCreation,
    validateLogin,
    validateTaskCreation,
    validateUpdateUser,
    validateTaskUpdate,
};
