const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  challenge_id: { type: String, required: true, ref: 'Challenge' },
  daily_update_id: { type: String, required: true, ref: 'DailyUpdate' },
  commenterid: { type: String, required: true, ref: 'User' },
  comment: { type: String, required: true },
  like: { type: [Object], default: [] },
  like_count: { type: Number, default: 0 }
}, {timestamps : true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
