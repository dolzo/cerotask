// Importar mongoose
const mongoose = require('mongoose');

// Conectarse
const connection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/cerotask');
    } catch (error) {
        console.log(`Error al conectarse a mongo\n${error}`);
    }
};

module.exports = connection;
