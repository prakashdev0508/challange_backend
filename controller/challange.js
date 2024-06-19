const Challenge = require("../modals/challangeModal");
const User = require("../modals/userModal");
const Comments = require("../modals/commentsModal");
const DailyUpdate = require("../modals/dailyUpdateModal");
const { createError } = require("../utils/responses");

//Create challange
exports.createChallange = async (req, res, next) => {
  try {
    const {
      description,
      challenge_date,
      challenge_end_date,
      challenge_type,
      challenge_name,
      challange_category,
    } = req.body;

    const { _id } = req.user;

    const challengeDate = new Date(
      challenge_date.split("-").reverse().join("-")
    );
    const challengeEndDate = new Date(
      challenge_end_date.split("-").reverse().join("-")
    );

    const newChallange = new Challenge({
      userId: _id,
      challenge_name,
      description,
      challenge_date: challengeDate,
      challenge_end_date: challengeEndDate,
      challenge_type,
      challange_category,
    });
    await newChallange.save();

    res.status(201).json({ message: "Challange Created", newChallange });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

exports.upvotes = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const userData = {
      userId: _id,
      username: user.username,
      email: user.email,
    };

    const { id } = req.params;
    const challenge = await Challenge.findById(id);

    if (!challenge) {
      return next(createError(404, "Challenge not found"));
    }

    const upvoteIndex = challenge.upvotes.findIndex(
      (upvote) => upvote.userId.toString() === _id.toString()
    );

    if (upvoteIndex === -1) {
      challenge.upvotes.push(userData);
      challenge.upvotes_count += 1;
    } else {
      challenge.upvotes.splice(upvoteIndex, 1);
      challenge.upvotes_count -= 1;
    }

    await challenge.save();

    res
      .status(200)
      .json({
        message: "Upvote toggled",
        challengeCount: challenge.upvotes_count,
        id: challenge._id,
      });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

exports.getChallangeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const challange = await Challenge.findById(id);

    const dailyUpdate = await DailyUpdate.find({challenge_id : id})

    res.status(201).json({ message: "success", challange , dailyUpdate });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

exports.allchallangesOfuser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const challanges = await Challenge.find({ userId: id });

    res.status(200).json({ message: "success", challanges });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

exports.websitechallangeView = async (req, res, next) => {
  try {
  } catch (error) {
    next(createError(400, error));
  }
};
