const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let postSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    required: "le contenu est requis",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
