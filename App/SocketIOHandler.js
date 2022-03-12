const { Server } = require("socket.io");

/**
 * Handles SocketIO route 
 * @param {Server} io
 */
const handleSocketIo = (io)=>{
 io.on("connection", (socket) => {
        console.log("A user connected");

        socket.on("disconnect", ()=>{
            console.log("A user disconnected");
        });

        socket.on("object", (object) => {
            console.log(object);
            socket.broadcast.emit("object", object);
            
        })
    }
    );

}


module.exports={
    handleSocketIo
}