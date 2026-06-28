const express = require("express");
require("dotenv").config();
const { initializeDatabase } = require("./config/db");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "GitHub Profile Analyzer API",
    endpoints: {
      analyzeProfile: "GET /api/profile/:username",
      getAllProfiles: "GET /api/profiles",
      getProfile: "GET /api/profiles/:username",
    },
  });
});

app.use("/api", profileRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};
startServer();