// Importar dependencias de mongoose
const { Schema, model } = require('mongoose');

// El esquema de un usuario
const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'role_user',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('UserSchema', UserSchema, 'users');
