// NOTE - Imports
const express = require("express");
const router = express.Router();

// SECTION[epic=routes] - Route settings

// NOTE - Imports controllers
const TeapotController = require("../controllers/teapot.controller");

// NOTE - API route
router.all(/coffee/i, TeapotController.Teapot);

// NOTE - Exporting route
module.exports = router;

// !SECTION
