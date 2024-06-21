const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const { createHotChallange, getHotChallanges, searchHotChallanges } = require("../controller/category");

const router = express.Router();

router.post("/create" , createHotChallange )
router.get("/allhotchallanges",getHotChallanges )
router.get("/search" , searchHotChallanges)



module.exports = router;