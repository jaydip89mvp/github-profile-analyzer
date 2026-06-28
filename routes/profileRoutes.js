const express = require("express");
const router = express.Router();
const {
  analyzeProfile,
  getAll,
  getByUsername,
} = require("../controllers/profileController");

router.get("/profile/:username", analyzeProfile);
router.get("/profiles", getAll);
router.get("/profiles/:username", getByUsername);

module.exports = router;
