// routes/dietRoutes.js
const express = require("express");
const { getDietRecommendations } = require("../controllers/dietController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Allow all authenticated users to access diet recommendations
router.post("/recommendations", authenticate, getDietRecommendations);

module.exports = router;
