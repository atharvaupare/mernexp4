const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { Server } = require("socket.io");
const http = require("http"); // Add this line

const studentRoutes = require("./routes/studentRoutes");

dotenv.config();



// Initialize the Express app
const app = express();

// Create HTTP server
const server = http.createServer(app); // Add this line

// Initialize Socket.IO with the HTTP server
const io = new Server(server, {
  // Modified this line
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON and handle CORS
app.use(cors());
app.use(express.json());

// Define routes
app.use("/api/students", studentRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred.",
    error: err.message,
  });
});

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Export both app and server
module.exports = { app, server }; // Modified export
