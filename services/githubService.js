require("dotenv").config();
const axios = require("axios");

const GITHUB_API_URL = "https://api.github.com/users";

const fetchGithubProfile = async (username) => {
  const response = await axios.get(`${GITHUB_API_URL}/${username}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "github-profile-analyzer",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  const data = response.data;

  return {
    github_id: data.id,
    username: data.login,
    name: data.name,
    bio: data.bio,
    public_repos: data.public_repos,
    followers: data.followers,
    following: data.following,
    avatar_url: data.avatar_url,
    profile_url: data.html_url,
    account_created_at: new Date(data.created_at)
      .toISOString()
      .slice(0, 19)
      .replace("T", " "),
  };
};

module.exports = { fetchGithubProfile };