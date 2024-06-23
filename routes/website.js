const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const { websiteHomePage } = require("../controller/website");

const router = express.Router();

router.get("/home-page" , websiteHomePage)

module.exports = router;