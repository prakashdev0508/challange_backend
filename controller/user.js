const User = require("../modals/userModal");
const { createError } = require("../utils/responses");

//user update

exports.updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const {
      username,
      email,
      password,
      account_type,
      role,
      prefered_categories,
    } = req.body;

    if (email && !validator.isEmail(email)) {
      return next(createError(400, "Invalid email address"));
    }

    const updatedData = {
      username,
      email,
      password,
      account_type,
      role,
      prefered_categories,
    };

    Object.keys(updatedData).forEach(
      (key) => updatedData[key] === undefined && delete updatedData[key]
    );

    const updatedUser = await User.findByIdAndUpdate(_id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({ message: "User Updated", updatedUser });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

exports.followUser = async (req, res, next) => {
  try {
    const { targetUserId } = req.body;
    const { _id } = req.user;

    const userId = _id;

    if (userId === targetUserId) {
      return next(createError(400, "You cannot follow yourself."));
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return next(createError(404, "User not found."));
    }

    if (user.following.includes(targetUserId)) {
      return next(createError(400, "You are already following this user."));
    }

    user.following.push(targetUserId);
    targetUser.follower.push(userId);

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: "User followed successfully." });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

// Function to unfollow a user
exports.unfollowUser = async (req, res, next) => {
  try {
    const { targetUserId } = req.body;
    const { _id } = req.user;

    const userId = _id;

    if (userId === targetUserId) {
      return next(createError(400, "You cannot unfollow yourself."));
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return next(createError(404, "User not found."));
    }

    if (!user.following.includes(targetUserId)) {
      return next(createError(400, "You are not following this user."));
    }

    user.following = user.following.filter(
      (id) => id.toString() !== targetUserId.toString()
    );
    targetUser.follower = targetUser.follower.filter(
      (id) => id.toString() !== userId.toString()
    );

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: "User unfollowed successfully." });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

//user delete

//all user data

//single user data

//admin updation
