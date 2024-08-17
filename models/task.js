// Importar dependencias de mongoose
const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

TaskSchema.plugin(mongoosePaginate);

module.exports = model('TaskSchema', TaskSchema, 'tasks');
