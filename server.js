const io = require('socket.io')(4200);

io.on('connection', socket => {
    socket.on('CLIENT_SEND_MESSAGE', message => {
        io.emit('SERVER_SEND_MESSAGE', message);
    });
});
