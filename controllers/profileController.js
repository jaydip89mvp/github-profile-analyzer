const { fetchGithubProfile } = require("../services/githubService");
const {
  saveOrUpdateProfile,
  getAllProfiles,
  getProfileByUsername,
} = require("../models/profileModel");

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username || !username.trim()) {
      return res.status(400).json({ error: "Username is required" });
    }

    const usernameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ error: "Invalid GitHub username format" });
    }

    const githubData = await fetchGithubProfile(username);
    const savedProfile = await saveOrUpdateProfile(githubData);

    return res.status(200).json({
      message: "Profile analyzed and stored successfully",
      profile: savedProfile,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res
        .status(404)
        .json({ error: "GitHub user not found" });
    }

    if (error.response && error.response.status === 403) {
      return res
        .status(403)
        .json({ error: "GitHub API rate limit exceeded. Try again later." });
    }

    console.error("Error analyzing profile:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAll = async (req, res) => {
  try {
    const profiles = await getAllProfiles();

    return res.status(200).json({
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username || !username.trim()) {
      return res.status(400).json({ error: "Username is required" });
    }

    const profile = await getProfileByUsername(username);

    if (!profile) {
      return res
        .status(404)
        .json({ error: "Profile not found. Analyze it first using GET /api/profile/:username" });
    }

    return res.status(200).json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { analyzeProfile, getAll, getByUsername };
