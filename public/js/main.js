(()=>{
    var socket = io();

    const sendObject = (object) => {
      socket.emit('object', object);
    }

   socket.on("object", (object) => {
            console.log(object);
        }) 

    window.sendObject = sendObject;
})();

