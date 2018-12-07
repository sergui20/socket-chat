// socket.io funciona con el protocolo http al igual que express

const express = require('express'); // web infrastructure
const socketIO = require('socket.io'); // Socket library
const http = require('http');   // HTTP interface

const path = require('path');

const app = express(); // Initializing express function
let server = http.createServer(app); // Creating the server

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000; //Configuring the port

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');

server.listen(port, (err) => {
    if (err) throw new Error(err)
    console.log(`Servidor corriendo en puerto ${ port }`);
});