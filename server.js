const express = require("express");
require("dotenv").config();
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
