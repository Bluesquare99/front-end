import { connect, io } from "socket.io-client";
import { connected } from './stores.js'
import { onDestroy } from 'svelte'

let socketConnected = false;

const unsubscribe = connected.subscribe((value) => (socketConnected = value));
console.log(socketConnected)

let socket

if (socketConnected === false)
{
    console.log('hi doggie');
    socket = new WebSocket('ws://localhost:8000/ws/1');
}

socket.onopen = function(event) {
    console.log("[open] Connection established");
    connected.set(true)
};

socket.onmessage = function(event) {
    console.log("[message] Data received from server, ", event);
};
