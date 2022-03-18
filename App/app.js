const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server: SocketServer } = require('socket.io');
const io = new SocketServer(server);
const socketIoHandler = require('./SocketIOHandler');
const appHandler = require('./appHandler');

const start = () => {

    server.listen(process.env.PORT||8033, () => {
        console.log("Listening to ", process.env.PORT);
    });   
  
    app.use(express.json());
    app.use(express.urlencoded());

    appHandler.handleApp(app, express);

    socketIoHandler.handleSocketIo(io);
  
    app.post('/load/', function (req, res) {
      io.emit("load", {url: req.body.url});
      res.redirect('back')
    })
}

module.exports = {
    start
}

