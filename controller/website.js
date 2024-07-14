const Challenge = require("../modals/challangeModal");
const User = require("../modals/userModal");
const Comments = require("../modals/commentsModal");
const DailyUpdate = require("../modals/dailyUpdateModal");
const Category = require("../modals/categoryModal");
const { createError } = require("../utils/responses");

exports.websiteHomePage = async (req, res, next) => {
  try {
    const {
      search,
      page = 1,
      limit = 10,
      sortBy = "upvotes",
      sortOrder = "desc",
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { challenge_name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sortOptions = {};
    if (sortBy === "upvotes") {
      sortOptions.upvotes_count = sortOrder === "desc" ? -1 : 1;
    }

    const challenges = await Challenge.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalChallenges = await Challenge.countDocuments(query);

    const challengesWithUserData = await Promise.all(
      challenges.map(async (challenge) => {
        const user = await User.findById(challenge.userId, "username _id");
        const challengeCategory = await Category.findById(
          challenge.challange_category,
          "label"
        );
        return {
          ...challenge.toObject(),
          user: user ? { username: user.username, _id: user._id } : null,
          category: challengeCategory
            ? { category_name: challengeCategory.label }
            : null,
        };
      })
    );

    const topUsers = await User.find()
      .sort({ follower: -1 })
      .limit(10) // Adjust the limit as needed
      .select("username _id follower following account_type");

    res.status(200).json({
      topChallange: {
        totalPages: Math.ceil(totalChallenges / limit),
        currentPage: parseInt(page),
        challenges: challengesWithUserData,
      },
      topUsers: topUsers.map((user) => ({
        userName: user.username,
        followerCount: user.follower.length,
        followingCount: user.following.length,
        account_type: user.account_type,
      })),
    });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};
