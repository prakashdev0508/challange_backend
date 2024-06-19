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

//user delete

//all user data

//single user data

//admin updation
