const Challenge = require("../modals/challangeModal");
const User = require("../modals/userModal");
const Comments = require("../modals/commentsModal");
const DailyUpdate = require("../modals/dailyUpdateModal");
const { createError } = require("../utils/responses");

// Create a new daily update
exports.createDailyUpdate = async (req, res, next) => {
  try {
    const { challenge_id, description, links_shared } = req.body
    const {_id } = req.user

    const user = await User.findById(_id)
    if (!user) {
        return next(createError(404, 'user not found'));
      }
  

    // Validate challenge existence
    const challenge = await Challenge.findById(challenge_id);
    if (!challenge) {
      return next(createError(404, 'Challenge not found'));
    }

    // Create new daily update
    const dailyUpdate = new DailyUpdate({
      userId : _id,
      challenge_id,
      description,
      links_shared,
    });

    await dailyUpdate.save();

    res.status(201).json({ message: 'Daily update created', dailyUpdate });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

// Get daily updates for a specific challenge
exports.getDailyUpdatesByChallenge = async (req, res, next) => {
  try {
    const { challenge_id } = req.params;

    // Validate challenge existence
    const challenge = await Challenge.findById(challenge_id);
    if (!challenge) {
      return next(createError(404, 'Challenge not found'));
    }

    // Fetch daily updates for the challenge
    const dailyUpdates = await DailyUpdate.find({ challenge_id });

    res.status(200).json({ dailyUpdates });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

// Update a daily update
exports.updateDailyUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, links_shared } = req.body;

    // Find the daily update by ID and update it
    const dailyUpdate = await DailyUpdate.findByIdAndUpdate(
      id,
      { description, links_shared },
      { new: true, runValidators: true }
    );

    if (!dailyUpdate) {
      return next(createError(404, 'Daily update not found'));
    }

    res.status(200).json({ message: 'Daily update updated', dailyUpdate });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

// Delete a daily update
exports.deleteDailyUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the daily update by ID and delete it
    const dailyUpdate = await DailyUpdate.findByIdAndDelete(id);

    if (!dailyUpdate) {
      return next(createError(404, 'Daily update not found'));
    }

    res.status(200).json({ message: 'Daily update deleted' });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};
