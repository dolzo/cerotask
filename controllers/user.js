// Dependencias
const User = require('../models/user');
const validate = require('../helpers/validate');
const jwt = require('../helpers/jwt');
const bcrypt = require('bcrypt');
const user = require('../models/user');

// Crear usuario

const createUser = async (req, res) => {
    // Recoger parametros
    const params = req.body;

    // Validar parametros
    try {
        validate.validateUserCreation(params);
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            message: 'Validacion de creacion del usuario no superada',
        });
    }

    // Buscar si existe el usuario - usuarios duplicados
    const existingUser = await User.find({
        $or: [{ email: params.email.toLowerCase() }],
    }).exec();

    if (existingUser && existingUser.length >= 1) {
        return res.status(200).send({
            status: 'error',
            message: 'El usuario ya esta registrado',
        });
    }

    // Cifrar la password
    const cypheredPassword = await bcrypt.hash(params.password, 10);
    params.password = cypheredPassword;

    // Crear objeto de usuario
    const user = new User(params);

    // Guardar usuario en mongodb
    try {
        const userToSave = await user.save();
        return res.status(200).send({
            status: 'ok',
            message: 'Usuario guardado correctamente',
            userToSave,
        });
    } catch (error) {
        return res.status(500).send({
            stauts: 'error',
            message: 'Ha ocurrido un error al guardar el usuario',
            error: error.message,
        });
    }
};

// Logearse con un usuario

const loginUser = async (req, res) => {
    // Recoger parametros
    const params = req.body;

    // Validar parametros
    try {
        validate.validateLogin(params);
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            message: 'Validacion del correo del usuario no superada',
        });
    }

    // Buscar en mongo si existe el usuario
    const userFound = await User.findOne({
        email: params.email,
    })
        .select('+password')
        .exec();

    if (!userFound) {
        return res.status(400).send({
            status: 'error',
            message: 'El email o la contraseña no es correcto',
        });
    }

    // Comprobar la password
    const passwordMatch = bcrypt.compareSync(
        params.password,
        userFound.password
    );

    if (!passwordMatch) {
        return res.status(400).send({
            status: 'error',
            message: 'El email o la clave no esta correcto',
        });
    }

    // COnseguir token
    const token = jwt.createToken(userFound);

    // Devolver datos del usuario
    return res.status(200).send({
        status: 'ok',
        message: 'Login exitoso',
        user: userFound,
        token,
    });
};

// Obtener todos los usuarios

const getUsers = async (req, res) => {
    try {
        // Buscar el usuario
        const users = await User.find().select('-password');

        if (!users) {
            return res.status(404).send({
                status: 'ok',
                message: 'No se han encontrado usuarios',
            });
        }

        return res.status(200).send({
            status: 'ok',
            users,
        });
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            error: error.message,
        });
    }
};

// Obtener un usuario especifico

const getSpecificUser = async (req, res) => {
    // Usuario logeado
    const currentUser = req.user;

    // Parametro de id de usuario en la url
    const userId = req.params.id;

    try {
        // Buscar el usuario
        const userFound = await User.findById(userId).select('-password');

        if (!userFound) {
            return res.status(404).send({
                status: 'ok',
                message: 'No se ha encontrado al usuario',
                userFound,
            });
        }

        return res.status(200).send({
            status: 'ok',
            userFound,
        });
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            error: error.message,
        });
    }
};

// Modificar un usuario especifico

const updateUser = async (req, res) => {
    // Recoger datos del usuario
    const userIdentity = req.user;

    // Recoger datos a actualizar
    const params = req.body;

    // Validar parametros
    try {
        validate.validateUpdateUser(params);
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            message: error.message,
        });
    }

    // Buscar y actualizar usuairo en la base de datos
    try {
        // Buscar usuarios con el mismo email
        const duplicatedUser = await User.find({
            email: params.email.toLowerCase(),
        });

        // Verificar si hay un usuario con el mismo email aparte del usuario actual
        let UserIsSet = false;
        duplicatedUser.forEach((user) => {
            if (user && user._id != userIdentity._id) {
                UserIsSet = true;
            }
        });

        // Retornar error si es que se encuentra usuario con mismo email
        if (UserIsSet) {
            return res.status(500).send({
                status: 'error',
                message: 'El correo electronico ya se encuentra en uso',
            });
        }

        // Si llega la password se cifra
        if (params.password) {
            const cipheredPassword = await bcrypt.hash(params.password, 10);
            params.password = cipheredPassword;
        }

        // Buscar y actualizar, se oculta la password
        const updatedUser = await User.findByIdAndUpdate(
            userIdentity.id,
            params,
            { new: true }
        ).select('-password');

        return res.status(200).send({
            status: 'ok',
            message: 'Usuario actualizado',
            updatedUser,
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'No se ha podido actualizar el usuario',
            error: error.message,
        });
    }
};

// Borrar un usuario especifico

const deleteUser = async (req, res) => {
    // Recoger datos del usuario
    const userIdentity = req.user;

    // Recoger usuario a borrar
    const userId = req.params.id;

    // Validar que el usuario sea el mismo que el usuario a borrar
    if (userIdentity.id != userId && userIdentity !== 'role_admin') {
        // Si son distintos
        return res.status(401).send({
            status: 'Unauthorized',
            message: 'No estas autorizado a borrar este usuario',
        });
    }

    try {
        // Buscar y borrar el usuario
        const deletedUser = await User.findByIdAndDelete(userId);

        if (deletedUser === null) {
            return res.status(404).send({
                status: 'ok',
                message: 'No se ha encontrado al usuario con la ID indicada',
            });
        }

        return res.status(200).send({
            status: 'ok',
            message: 'Usuario eliminado',
            deletedUser,
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error: error.message,
        });
    }
};

module.exports = {
    createUser,
    loginUser,
    getUsers,
    getSpecificUser,
    updateUser,
    deleteUser,
};
