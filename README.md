# GitHub Profile Analyzer API

A REST API built with Node.js, Express.js, and MySQL that fetches GitHub user profiles, stores them in a database, and provides endpoints to retrieve analyzed profiles.

## Tech Stack

- Node.js
- Express.js
- MySQL
- Axios
- mysql2
- dotenv

## Project Structure

```
github-profile-analyzer/
├── config/
│   └── db.js              # MySQL connection pool
├── controllers/
│   └── profileController.js  # Request handlers
├── models/
│   └── profileModel.js     # Database queries
├── routes/
│   └── profileRoutes.js    # API routes
├── services/
│   └── githubService.js    # GitHub API calls
├── server.js               # App entry point
├── schema.sql              # Database schema
├── .env.example            # Environment variables template
├── package.json
└── README.md
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repo-url>
cd github-profile-analyzer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

Open MySQL and run the SQL schema:

```bash
mysql -u root -p < schema.sql
```

Or copy-paste the contents of `schema.sql` into your MySQL client (MySQL Workbench, phpMyAdmin, etc.).

### 4. Configure environment variables

Copy the example file and fill in your MySQL credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=github_analyzer
DB_PORT=3306
```

### 5. Start the server

```bash
npm run dev
```

The server will start at `http://localhost:3000`.

## API Endpoints

### 1. Analyze a GitHub Profile

Fetches the user from GitHub API, stores/updates in MySQL, and returns the result.

```
GET /api/profile/:username
```

**Example:**

```
GET http://localhost:3000/api/profile/torvalds
```

**Response (200):**

```json
{
  "message": "Profile analyzed and stored successfully",
  "profile": {
    "id": 1,
    "github_id": 1024025,
    "username": "torvalds",
    "name": "Linus Torvalds",
    "bio": null,
    "public_repos": 16,
    "followers": 220000,
    "following": 0,
    "avatar_url": "https://avatars.githubusercontent.com/u/1024025?v=4",
    "profile_url": "https://github.com/torvalds",
    "account_created_at": "2011-09-03T15:26:22.000Z",
    "analysis_date": "2026-06-28T10:30:00.000Z",
    "created_at": "2026-06-28T10:30:00.000Z",
    "updated_at": "2026-06-28T10:30:00.000Z"
  }
}
```

**Error - User Not Found (404):**

```json
{
  "error": "GitHub user not found"
}
```

**Error - Invalid Username (400):**

```json
{
  "error": "Invalid GitHub username format"
}
```

---

### 2. Get All Stored Profiles

Returns all analyzed profiles, sorted by latest analysis first.

```
GET /api/profiles
```

**Example:**

```
GET http://localhost:3000/api/profiles
```

**Response (200):**

```json
{
  "count": 2,
  "profiles": [
    {
      "id": 2,
      "github_id": 583231,
      "username": "octocat",
      "name": "The Octocat",
      "bio": null,
      "public_repos": 8,
      "followers": 15000,
      "following": 9,
      "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
      "profile_url": "https://github.com/octocat",
      "account_created_at": "2011-01-25T18:44:36.000Z",
      "analysis_date": "2026-06-28T11:00:00.000Z",
      "created_at": "2026-06-28T11:00:00.000Z",
      "updated_at": "2026-06-28T11:00:00.000Z"
    },
    {
      "id": 1,
      "github_id": 1024025,
      "username": "torvalds",
      "name": "Linus Torvalds",
      "bio": null,
      "public_repos": 16,
      "followers": 220000,
      "following": 0,
      "avatar_url": "https://avatars.githubusercontent.com/u/1024025?v=4",
      "profile_url": "https://github.com/torvalds",
      "account_created_at": "2011-09-03T15:26:22.000Z",
      "analysis_date": "2026-06-28T10:30:00.000Z",
      "created_at": "2026-06-28T10:30:00.000Z",
      "updated_at": "2026-06-28T10:30:00.000Z"
    }
  ]
}
```

---

### 3. Get a Single Stored Profile

Returns a stored profile from the database by username.

```
GET /api/profiles/:username
```

**Example:**

```
GET http://localhost:3000/api/profiles/torvalds
```

**Response (200):**

```json
{
  "profile": {
    "id": 1,
    "github_id": 1024025,
    "username": "torvalds",
    "name": "Linus Torvalds",
    "bio": null,
    "public_repos": 16,
    "followers": 220000,
    "following": 0,
    "avatar_url": "https://avatars.githubusercontent.com/u/1024025?v=4",
    "profile_url": "https://github.com/torvalds",
    "account_created_at": "2011-09-03T15:26:22.000Z",
    "analysis_date": "2026-06-28T10:30:00.000Z",
    "created_at": "2026-06-28T10:30:00.000Z",
    "updated_at": "2026-06-28T10:30:00.000Z"
  }
}
```

**Error - Not Found (404):**

```json
{
  "error": "Profile not found. Analyze it first using GET /api/profile/:username"
}
```


