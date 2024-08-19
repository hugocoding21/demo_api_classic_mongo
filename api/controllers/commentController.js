const Comments = require("../models/commentModel");
const Post = require("../models/postModel");

exports.getAll = async (req, res) => {
  try {
    const posts = await Comments.find({});

    res.status(200);
    res.json(posts);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "erreur server" });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const { post } = req.params;
    const comments = await Comments.find({ post: post });

    if (!comments.length) {
      return res.status(404).json({ message: "Commentaire introuvable" });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.createComment = async (req, res) => {
  const { post_title } = req.params;

  try {
    const post = await Post.findOne({ title: post_title });

    if (!post) {
      return res.status(404).json({ message: "Impossible d'ajouté un commentaire a un post non existant" });
    }

    const newComment = new Comments({
      ...req.body,
      post: post._id,
    });

    const comment = await newComment.save();

    post.comments.push(comment._id);
    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateComment = async (req, res) => {
  const { comment_id } = req.params;
  const editedComment = req.body;

  try {
    const comment = await Comments.findByIdAndUpdate(comment_id, editedComment, {
      new: true,
      runValidators: true,
    });

    if (!updatedComment) {
      return res.status(404).json({ message: "Commentaire introuvable" });
    }

    res.status(201).json(comment);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

exports.deleteComment = async (req, res) => {
  const { comment_id } = req.params;

  try {
    const result = await Comments.deleteOne({ _id: comment_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Commentaire introuvable" });
    }

    res.status(200).json({ message: "Commentaire supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server erreur" });
  }
};
