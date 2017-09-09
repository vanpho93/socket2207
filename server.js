const io = require('socket.io')(4200);

io.on('connection', socket => {
    setInterval(() => {
        const num = Math.random();
        socket.emit('SERVER_SEND_MESSAGE', num);
    }, 3000);
});

// arr.forEach(e => console.log(e));
// tren server -> co nhieu tuy chon gui di
// io Quan ly tat ca cac socket
// socket quan ly ket noi toi 1 client
// socket.emit('tag', value) 
//socket.on('tag', value => console.log(value));