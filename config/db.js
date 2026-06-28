const mysql = require("mysql2/promise");
require("dotenv").config();
// First pool WITHOUT a database — used only to create the DB
const initPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306,
});
// Main pool WITH the database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

const initializeDatabase = async () => {
  const dbName = process.env.DB_NAME;
  await initPool.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS \`${dbName}\`.profiles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      github_id BIGINT NOT NULL UNIQUE,
      username VARCHAR(100) NOT NULL UNIQUE,
      name VARCHAR(255),
      bio TEXT,
      public_repos INT DEFAULT 0,
      followers INT DEFAULT 0,
      following INT DEFAULT 0,
      avatar_url VARCHAR(500),
      profile_url VARCHAR(500),
      account_created_at DATETIME,
      analysis_date DATETIME NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  await initPool.execute(createTableSQL);
  await initPool.end();
  console.log(`Database "${dbName}" and table "profiles" are ready.`);
};
module.exports = { pool, initializeDatabase };