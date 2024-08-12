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
    // Validar nombre si esta presente
    if (params.name) {
        let name =
            validator.isLength(params.name, { min: 3, max: undefined }) &&
            validator.isAlpha(params.name, 'es-ES');
        if (!name) {
            throw new Error('El nombre no es valido');
        }
    }

    // Validar apellido si esta presente
    if (params.surname) {
        let surname =
            validator.isLength(params.surname, { min: 2, max: undefined }) &&
            validator.isAlpha(params.surname, 'es-ES');
        if (!surname) {
            throw new Error('El apellido no es valido');
        }
    }

    // Validar email si esta presente
    if (params.email) {
        let email = validator.isEmail(params.email);
        if (!email) {
            throw new Error('El email no es valido');
        }
    }

    // Validar contraseña si esta presente
    if (params.password) {
        let password = validator.isStrongPassword(params.password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
        });
        if (!password) {
            throw new Error('La contraseña no es lo suficientemente fuerte');
        }
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

module.exports = {
    validateUserCreation,
    validateLogin,
    validateTaskCreation,
    validateUpdateUser,
};
