const Challenge = require("../modals/challangeModal");
const User = require("../modals/userModal");
const Comments = require("../modals/commentsModal");
const DailyUpdate = require("../modals/dailyUpdateModal");
const { createError } = require("../utils/responses");
exports.websiteHomePage = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { challenge_name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const challenges = await Challenge.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalChallenges = await Challenge.countDocuments(query);

    const challengesWithUserData = await Promise.all(
      challenges.map(async (challenge) => {
        const user = await User.findById(challenge.userId, "username _id");
        return {
          ...challenge.toObject(),
          user: user ? { username: user.username, _id: user._id } : null,
        };
      })
    );

    res.status(200).json({
      totalPages: Math.ceil(totalChallenges / limit),
      currentPage: parseInt(page),
      challenges: challengesWithUserData,
    });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};
