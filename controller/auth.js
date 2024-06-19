const User = require("../modals/userModal");
const Challenge = require("../modals/challangeModal");
const { createError } = require("../utils/responses");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//User register
exports.register = async (req, res, next) => {
  try {
    const { username, email, password, account_type } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      account_type,
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successfull", newUser });
  } catch (error) {
    if (error.keyValue.username) {
      return next(createError(403, "Username Already exist"));
    } else if (error.keyValue.email) {
      return next(createError(403, "Email Already exist"));
    }
    res.status(400).json({ message: "Error", errorMsg: error });
  }
};

//User login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(403, "User not found"));
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return next(createError(403, "Invlaid credentials"));
    }

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.status(201).json({ message: "Logged in", token });
  } catch (error) {
    next(error);
  }
};

//me
exports.me = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).select(
      "email username prefered_categories"
    );

    if (!user) {
      return next(createError(404, "User not found"));
    }
    const challengeCount = await Challenge.countDocuments({ userId: _id });
    res.status(200).json({
      message: "success",
      data: {
        user,
        challengeCount,
      },
    });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};
