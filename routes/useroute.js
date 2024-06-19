const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const { updateUser } = require("../controller/user");

const router = express.Router();

router.put("/update" , authenticateToken , updateUser)

module.exports = router;