const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// Load environment variables from .env file
require("dotenv").config();

// Define CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Adjust with your frontend URL if different
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"], // Add this line to make sure the headers are allowed
};

app.use(cors(corsOptions)); // Apply CORS configuration

// Middleware to handle JSON request bodies
app.use(express.json()); // To handle incoming JSON data

// Import your API and email routes
const apiRoutes = require("./routes/api");
const emailRoutes = require("./routes/email");

// Simple test route to check backend
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Use the routes for API and email functionality
app.use("/api", apiRoutes); // API routes for `/api`
app.use("/api", emailRoutes); // Email routes for `/api/send-email`

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
