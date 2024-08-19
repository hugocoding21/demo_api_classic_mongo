const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: "Content is required",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
