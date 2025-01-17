// Dependencias
const express = require('express');
const cors = require('cors');
const connection = require('./database/connection');
const bodyParser = require('body-parser');
require('dotenv').config();

// Conectarse a mongodb
connection();

// Servidor
const app = express();
const port = process.env.port;

// Configurar cors
app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar configuracion de rutas
const task = require('./routes/task');
const user = require('./routes/user');

app.use('/apiv1/task', task);
app.use('/apiv1/user', user);

// Ruta default
app.get('/', (req, res) => {
    return res.status(200).send({
        message: 'Hello there!! xD',
    });
});

// Escuchar peticiones http
app.listen(port, () => {
    console.log(`Puerto -> ${process.env.port} <-`);
});

// Mensaje de inicio
console.log('Ret2Go!!!');
console.log(`⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⢟⣛⣛⣛⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⣻⣿⣿⣿⣿⣿⣿⣿⣷⣟⢿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⢋⠙⢿⣿⣿⠃⣠⢖⣄⡹⣿⣿⠋⣀⣤⠤⣄⠉⢿⡎⣿⡎⣽⡿⣿⣿
⣿⣿⣿⣿⢸⣧⠀⠙⠧⠤⣛⣘⣋⡚⠒⠀⢱⠟⣡⠀⣿⣷⠈⢻⣶⣾⣿⣷⢹⣿
⣿⣿⣿⣿⡞⣿⡇⢠⣼⣿⣿⣿⣿⣿⣿⡷⣧⣾⣿⠀⣿⣿⡇⢸⣿⣿⣟⢿⣿⣿
⣿⣿⣿⣿⣷⠹⣱⣿⣿⣿⣿⣿⣿⣿⢹⣾⣿⣿⡇⠀⣿⠟⢀⣼⣿⣿⣿⡎⣿⣿
⣿⣿⣿⣿⣿⡆⣿⡏⣿⣿⣿⣿⢿⣿⣶⡉⠻⣿⠁⢰⣭⡓⠻⣿⣿⣷⣾⣥⡻⣿
⣿⣿⣿⣿⣿⣿⡝⡇⠙⢿⣿⢻⣿⣿⣿⣿⣶⣭⢠⣿⣿⣿⣄⢹⣿⣿⣿⣿⣿⡽
⣿⣿⣿⣿⣿⡏⡇⠀⢀⣰⠷⢶⠿⡿⠟⠛⠛⢛⣪⣿⣹⢿⣿⡀⠹⣿⣿⣿⣿⡇
⣛⣋⠉⠉⠉⠉⠀⠀⠼⠷⠖⠚⠒⠓⠂⣀⣴⣿⣿⣿⣟⣸⣿⣷⡀⠘⣿⣿⢟⣼
⡌⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⣼⣿⣿⣿⣿⡿⣸⣿⣿⣿⣧⠀⣸⣿⣷⡝
⣿⣄⠀⠀⠀⠀⠀⠀⠀⣠⠜⡟⠀⠀⢿⣿⣿⠿⡛⣽⣿⣿⣿⣿⣿⣤⣿⣿⡿⣣
⣿⣿⣿⣷⣶⣶⡲⣶⣿⡷⣮⣤⣤⣴⢾⡿⣿⣿⢱⣝⠿⣿⣿⣿⣿⡱⣿⢷⡜⣿
⣿⣿⣿⣿⣿⣿⣟⠼⣭⣳⣿⣿⣿⢱⣿⣿⡟⣵⣿⣿⣿⣷⢹⣿⢫⣝⣚⣛⣵⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣶⣿⣿⣿⣿⣞⠿⢿⣧⢟⣿⣿⣿⡿⣸⢏⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⣿⣿`);
