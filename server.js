const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chatMessage', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port = 3000;
http.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
