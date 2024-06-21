const Challenge = require("../modals/challangeModal");
const User = require("../modals/userModal");
const Comments = require("../modals/commentsModal");
const DailyUpdate = require("../modals/dailyUpdateModal");
const { createError } = require("../utils/responses");

exports.likeComment = async (req, res, next) => {
  try {
    const { _id } = req.user; // assuming user information is stored in req.user
    const { commentId } = req.params;

    const user = await User.findById(_id);

    if (!user) {
      return next(createError(404, "user not found"));
    }
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return next(createError(404, "Comment not found"));
    }

    const userData = {
      userId: _id,
      username: user.username,
    };

    const likeIndex = comment.like.findIndex(
      (like) => like.userId.toString().toString() === _id.toString()
    );

    if (likeIndex === -1) {
      comment.like.push(userData);
      comment.like_count += 1;
    } else {
      comment.like.splice(likeIndex, 1);
      comment.like_count -= 1;
    }

    await comment.save();

    res.status(200).json({ message: "Like toggled", comment });
  } catch (error) {
    console.log(error);
    next(createError(400, error));
  }
};

// Create a new comment
exports.createComment = async (req, res, next) => {
    try {
      const {_id} = req.user
      const {  challenge_id, daily_update_id, comment } = req.body;
  
      // Create new comment
      const newComment = new Comment({
        challenge_id,
        daily_update_id,
        commenterid: _id,
        comment,
      });
  
      await newComment.save();
  
      res.status(201).json({ message: 'Comment created', newComment });
    } catch (error) {
      console.log(error);
      next(createError(400, error));
    }
  };
  
  // Get comments for a specific daily update
  exports.getCommentsByDailyUpdate = async (req, res, next) => {
    try {
      const { daily_update_id } = req.params;
  
      // Fetch comments for the daily update
      const comments = await Comment.find({ daily_update_id });
  
      res.status(200).json({ comments });
    } catch (error) {
      console.log(error);
      next(createError(400, error));
    }
  };
  
  // Update a comment
  exports.updateComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { comment } = req.body;
  
      // Find the comment by ID and update it
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { comment },
        { new: true, runValidators: true }
      );
  
      if (!updatedComment) {
        return next(createError(404, 'Comment not found'));
      }
  
      res.status(200).json({ message: 'Comment updated', updatedComment });
    } catch (error) {
      console.log(error);
      next(createError(400, error));
    }
  };
  
  // Delete a comment
  exports.deleteComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
  
      // Find the comment by ID and delete it
      const deletedComment = await Comment.findByIdAndDelete(commentId);
  
      if (!deletedComment) {
        return next(createError(404, 'Comment not found'));
      }
  
      res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
      console.log(error);
      next(createError(400, error));
    }
  };
