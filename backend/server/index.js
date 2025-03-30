require('dotenv').config(); // Load environment variables from .env file

const express = require('express'); // Import Express framework
const cors = require('cors'); // Import CORS middleware
const http = require('http'); // Import Node's HTTP module
const { Server } = require("socket.io"); // Import Socket.IO Server class

// Create an Express application
const app = express();

// Use CORS middleware to enable cross-origin requests
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize a new instance of Socket.IO by passing the HTTP server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow requests from this origin and my frontend port = 5173
        methods: ["GET", "POST"], // Allow these HTTP methods
      },
});

// Listen for incoming Socket.IO connections
io.on("connection", (socket) => {
    console.log("User connected ", socket.id); // Log the socket ID of the connected user

    // Listen for "send_message" events from the connected client
    socket.on("send_message", (data) => {
      console.log("Message Received ", data); // Log the received message data

      // Emit the received message data to all connected clients
      io.emit("receive_message", data);
    });

    socket.on("add_todo", (data) => {
        console.log("Message Received ", data); // Log the received message data
  
        // Emit the received message data to all connected clients
        io.emit("todo_added", data);
      });
});

const PORT = process.env.PORT || 3001; // Define a default port if PORT is not set in .env

//if you use mongodb then you can paste this code lines.
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});