// Importar dependencias de mongoose
const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

UserSchema.plugin(mongoosePaginate);

module.exports = model('UserSchema', UserSchema, 'users');
