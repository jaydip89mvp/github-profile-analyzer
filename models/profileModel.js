const pool = require("../config/db");

const saveOrUpdateProfile = async (profile) => {
  const sql = `
    INSERT INTO profiles 
      (github_id, username, name, bio, public_repos, followers, following, avatar_url, profile_url, account_created_at, analysis_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      bio = VALUES(bio),
      public_repos = VALUES(public_repos),
      followers = VALUES(followers),
      following = VALUES(following),
      avatar_url = VALUES(avatar_url),
      profile_url = VALUES(profile_url),
      account_created_at = VALUES(account_created_at),
      analysis_date = NOW()
  `;

  const values = [
    profile.github_id,
    profile.username,
    profile.name,
    profile.bio,
    profile.public_repos,
    profile.followers,
    profile.following,
    profile.avatar_url,
    profile.profile_url,
    profile.account_created_at,
  ];

  await pool.execute(sql, values);

  return getProfileByUsername(profile.username);
};

const getAllProfiles = async () => {
  const sql = "SELECT * FROM profiles ORDER BY analysis_date DESC";
  const [rows] = await pool.execute(sql);
  return rows;
};

const getProfileByUsername = async (username) => {
  const sql = "SELECT * FROM profiles WHERE username = ?";
  const [rows] = await pool.execute(sql, [username]);
  return rows.length > 0 ? rows[0] : null;
};

module.exports = { saveOrUpdateProfile, getAllProfiles, getProfileByUsername };
