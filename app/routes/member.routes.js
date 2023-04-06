// NOTE - Imports
const express = require("express");
const router = express.Router();

// SECTION[epic=routes] - Route settings

// NOTE - Imports controllers
const MemberController = require("../controllers/member.controller");

// NOTE - API route
router.post("/login", MemberController.Login);
router.get("/players", MemberController.GetPlayers);

// NOTE - Exporting route
module.exports = router;

// !SECTION
