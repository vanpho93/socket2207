const io = require('socket.io')(4200);

const arrUsernames = ['aaa', 'bbb', 'ccc'];
const arrSockets = [];

io.on('connection', socket => {
    socket.on('CLIENT_SEND_MESSAGE', message => {
        io.emit('SERVER_SEND_MESSAGE', `${socket.username}: ${message}`);
    });

    socket.on('CLIENT_SIGN_IN', username => {
        const isExisted = arrUsernames.indexOf(username) !== -1;
        if (isExisted) return socket.emit('USERNAME_EXISTED');
        socket.username = username;
        socket.emit('SIGN_IN_SUCCESSFULLY', arrUsernames); 
        arrUsernames.push(username);
        arrSockets.push(socket);
        io.emit('NEW_USER', username);
    });

    socket.on('disconnect', () => {
        if(!socket.username) return;
        const index = arrUsernames.indexOf(socket.username);
        arrUsernames.splice(index, 1);
        io.emit('CLIENT_DISCONNECT', socket.username);
    });

    socket.on('CLIENT_SEND_PRIVATE_MESSAGE', ({ username, message }) => {
        const index = arrSockets.findIndex(aSocket => aSocket.username === username);
        const id = arrSockets[index].id;
        socket.to(id).emit('SERVER_SEND_MESSAGE', `${socket.username}: ${message}`);
    });

    socket.on('CLIENT_JOIN_ROOM', roomName => {
        if(!socket.myRoom) socket.join(roomName);
        socket.leave(socket.myRoom, () => {
            socket.myRoom = roomName;
            socket.join(roomName);
        });
    });

    socket.on('CLIENT_SEND_ROOM_MESSAGE', message => {
        console.log(message, socket.myRoom);
        io.in(socket.myRoom).emit('SERVER_SEND_MESSAGE', message);
    });
});

// Gui duoc username len server 
// Server kiem tra username ton tai chua? -> 
// neu chua ton tai, bao cho client la thanh cong, chuyen isLoggedIn -> true
// neu ton tai roi, bao cho client biet, alert('Username da ton tai');
