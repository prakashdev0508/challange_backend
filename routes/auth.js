const express = require("express");
const { register, login, me } = require("../controller/auth");
const { authenticateToken } = require("../middleware/authenticate");

const router = express.Router();


router.post("/register",  register)
router.post("/login",  login)
router.get("/me", authenticateToken , me)

module.exports = router;