require("dotenv").config()
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes");
const errorHandling = require("./middlewares/errorHandling.js");
const http = require('http').Server(app);



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandling);
const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:5173"
  }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});
app.use(router);

http.listen(port, () => {
  console.log(`Server listening on ${port}`);
});