const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const {
  createChallange,
  allchallangesOfuser,
  upvotes,
  getChallangeById,
} = require("../controller/challange");

const { createDailyUpdate  } = require("../controller/dailyupdates")

const router = express.Router();

router.post("/create-challange", authenticateToken, createChallange);
router.get("/user/:id", allchallangesOfuser);
router.get("/:id", getChallangeById);
router.post("/upvote/:id", authenticateToken ,upvotes);

//Daily  updates
router.post("/daily-update" , authenticateToken , createDailyUpdate)

module.exports = router;
