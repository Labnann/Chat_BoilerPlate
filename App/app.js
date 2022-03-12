const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server: SocketServer } = require('socket.io');
const io = new SocketServer(server);
const socketIoHandler = require('./SocketIOHandler');
const appHandler = require('./appHandler');

const start = () => {

    server.listen(process.env.port||8033, () => {
        console.log("Listening to 8033");
    });

    appHandler.handleApp(app, express);

    socketIoHandler.handleSocketIo(io);
}

module.exports = {
    start
}

