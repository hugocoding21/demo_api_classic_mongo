const Post = require("../models/postModel");

exports.listAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200);
    res.json(posts);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "erreur server" });
  }
};

exports.getOnePost = async (req, res) => {
  try {
    const { title } = req.params;
    const posts = await Post.findOne({ title: title });

    if (!posts) {
      return res.status(404).json({ message: "Post introuvable" });
    }

    res.status(200);
    res.json(posts);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "erreur server" });
  }
};

exports.createAPost = async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const post = await newPost.save();
    res.status(201);
    res.json(post);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "erreur server" });
  }
};

exports.UpdatePost = async (req, res) => {
  try {
    const { title } = req.params;
    const body = req.body;
    const posts = await Post.findOneAndUpdate({ title: title }, body, {
      new: true,
      runValidators: true,
    });

    if (!posts) {
      return res.status(404).json({ message: "Post introuvable" });
    }

    res.status(200);
    res.json(posts);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "erreur server" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { title } = req.params;
    const result = await Post.deleteOne({ title: title });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Post introuvable" });
    }

    res.status(200).json({ message: "Post supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "erreur server" });
  }
};

exports.addCommentByTitle = async (post_title, req, res) => {
  const post = await Post.findOneAndUpdate(
    { title: post_title },
    { $push: { comments: comment._id } },
    { new: true, runValidators: true }
  );

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
};
