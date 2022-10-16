console.log('yo homie')

import { io } from "socket.io-client";

let socket = new WebSocket('ws://localhost:8000/ws');
socket.onopen = function(e) {
    console.log("[open] Connection established");
    socket.send("hi")
    socket.send("ho")
};

socket.onmessage = function(event) {
    console.log("[message] Data received from server, ", event);

    // const arrayBuffer = event.data;

    // image_Slice.src = 'data:image/jpg;base64,' + arrayBuffer;
    // console.log("size= "+ arrayBuffer.length);
};
// socket.emit('hello!')

// import { WebSocket as holy} from "ws";
// setInterval(() => console.log(socket.connected), 1000)
// console.log(socket);


// // Create WebSocket connection.
// const socket = new holy('ws://localhost:8000/ws');
// console.log('made it past');
// // setInterval(() => console.log("you there?"), 1000)



// // Connection opened
// socket.addEventListener('open', (event) => {
//     console.log('hello baby');
//     // socket.send('Hello Server!');
// });
