const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages from clients
  socket.on('message', (ar) => {

    // Broadcast the message to all connected clients (including the sender)
    io.to(ar[5]).emit('message', (ar));

  });

  socket.on('join', (roomid) => {

   
    socket.join(roomid);
    console.log(" you are in room ",roomid);
  });



  socket.on('playsound', (roomid) => {

   
    io.to(roomid).emit('playsound',(roomid));
    console.log(" you are in room ",roomid);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
