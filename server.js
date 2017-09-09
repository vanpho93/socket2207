const io = require('socket.io')(4200);

const arrUsernames = ['a', 'b', 'c'];

io.on('connection', socket => {
    socket.on('CLIENT_SEND_MESSAGE', message => {
        io.emit('SERVER_SEND_MESSAGE', message);
    });

    socket.on('CLIENT_SIGN_IN', username => {
        const isExisted = arrUsernames.indexOf(username) !== -1;
        if (isExisted) return socket.emit('USERNAME_EXISTED');
        socket.username = username;
        socket.emit('SIGN_IN_SUCCESSFULLY', arrUsernames); 
        arrUsernames.push(username);
        io.emit('NEW_USER', username);
    });

    socket.on('disconnect', () => {
        if(!socket.username) return;
        const index = arrUsernames.indexOf(socket.username);
        arrUsernames.splice(index, 1);
        io.emit('CLIENT_DISCONNECT', socket.username);
    });
});

// Gui duoc username len server 
// Server kiem tra username ton tai chua? -> 
// neu chua ton tai, bao cho client la thanh cong, chuyen isLoggedIn -> true
// neu ton tai roi, bao cho client biet, alert('Username da ton tai');
