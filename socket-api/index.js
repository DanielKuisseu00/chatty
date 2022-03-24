const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();

app.use(cors({ origin: "*" }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("conneted");

  socket.on("join_room", (data) => {
    console.log(`user: ${socket.id} joined room: ${data}`);
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("recieve_message", data);
  });

  socket.on("disconnect", () => {
    console.log("disconneted");
  });
});

const PORT = process.env.PORT || 5002;

server.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
