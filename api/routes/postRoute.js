module.exports = (server) => {
  const postController = require("../controllers/postController");

  //ALL
  server.route("/posts").get(postController.listAllPosts);
  //ONE
  server.route("/posts/:title").get(postController.getOnePost);
  //CREATE
  server.route("/posts/create").post(postController.createAPost);
  //update
  server.route("/posts/edit/:title").post(postController.UpdatePost);
  //delete
  server.route("/posts/delete/:title").post(postController.deletePost);
};
