// Dependencias
const User = require('../models/user');
const validate = require('../helpers/validate');
const jwt = require('../helpers/jwt');
const bcrypt = require('bcrypt');

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
            error,
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
    currentUser = req.user;

    if (currentUser.role != 'user_admin') {
        return res.status(403).send({
            status: 'error',
            message: 'Acceso no autorizado',
        });
    }

    try {
        const users = await User.find();

        if (!users) {
            return res.status(200).send({
                status: 'ok',
                message: 'No se han encontrado usuarios',
            });
        }

        return res.status(200).send({
            status: 'ok',
            users,
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error,
        });
    }
};

// TODO: Obtener un usuario en especifico

module.exports = { createUser, loginUser, getUsers };
