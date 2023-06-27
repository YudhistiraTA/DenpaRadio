require("dotenv").config()
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes");
const errorHandling = require("./middlewares/errorHandling.js");
const videoQueueController = require("./controllers/videoQueueController");
const http = require('http').Server(app);



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandling);
const socketIO = require('socket.io')(http, {
  cors: {
    origin: "https://challenge1-387006.web.app"
  }
});
let users = [];
//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.emit('userSeed', users);
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });
  socket.on('disconnect', () => {
    console.log(`🔥: ${socket.id} user disconnected`);
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
  socket.on('newUser', (data) => {
    users.push(data);
    socketIO.emit('newUserResponse', users);
  })
});
app.use(router);
app.use(errorHandling);

http.listen(port, () => {
  console.log(`Server listening on ${port}`);
});