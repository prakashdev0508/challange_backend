const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const { updateUser, followUser, unfollowUser } = require("../controller/user");

const router = express.Router();

router.put("/update" , authenticateToken , updateUser)
router.post("/follow" , authenticateToken , followUser)
router.post("/un-follow" , authenticateToken , unfollowUser)

module.exports = router;