// Importar dependencias de mongoose
const { Schema, model } = require('mongoose');

// El esquema de una tarea
const TaskSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('TaskSchema', TaskSchema, 'tasks');
