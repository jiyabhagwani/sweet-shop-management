const express = require("express");
const cors = require("cors");

const authRoutes = require("./auth/auth.routes");
const sweetsRoutes = require("./sweets/sweets.routes");

const app = express();

// ✅ CORS MUST COME BEFORE ROUTES
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

app.get("/", (req, res) => {
  res.send("Sweet Shop Backend is running");
});

module.exports = app;

