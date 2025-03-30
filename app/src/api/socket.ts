import io from "socket.io-client"; // Import the socket.io client library

// Establish a socket connection to the server at the specified URL
export const socket = io("http://localhost:3001", {
  //   autoConnect: false,
});
