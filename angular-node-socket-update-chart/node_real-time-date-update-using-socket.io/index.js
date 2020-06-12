// invoke all the installed modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const socket = require("socket.io");

// create express app
const app = express();
// invoke cors & bodyParser on app
app.use(cors({ origni: "*" }));
app.use(bodyParser);

// set port of the app
const server = app.listen(3000, () => {
  console.log("Started in port : 3000");
});

// invoke the server on socket
const io = socket(server);

// create boolean variable x
let x = true;
// create sendData(socket) function
// invoke socket as input parameter
// snippet : func
function sendData(socket) {
  // invoke the x variable
  if (x) {
    // i wrote the arrow function code as :
    // () => {
    //   Math.floor(Math.random() * 590) + 10
    // }
    // and nothing is updating on the web browser
    // arrow function must be without {} when used in Array.from()
    // THIS FUCKING SHIT TOOK A WHOLE DAY!!!!!!!
    // invoke socket
    socket.emit(
      "data1",
      Array.from({ length: 8 }, () => Math.floor(Math.random() * 590) + 10)
    );
    x = !x;
  } else {
    // invoke socket
    socket.emit(
      "data2",
      Array.from({ length: 8 }, () => Math.floor(Math.random() * 590) + 10)
    );
    console.log(Math.floor(Math.random() * 590) + 10);
    x = !x;
  }
  console.log(`data is ${x}`);
  // snippet : sett
  setTimeout(() => {
    //   invoke sendData(socket)
    sendData(socket);
  }, 3000);
}

// turn on socket connection
io.sockets.on("connection", (socket) => {
  console.log(`new connection id : ${socket.id}`);
  // invoke the sendDate(socket) function above
  sendData(socket);
});
