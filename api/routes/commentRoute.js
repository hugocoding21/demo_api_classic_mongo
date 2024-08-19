module.exports = (server) => {
  const commentController = require("../controllers/commentController");
  //ALL
  server.route("/comments").get(commentController.getAll);
  //GETCOMMENTBYPOST
  server.route("/posts/comments/:post").get(commentController.getCommentsByPost);
  //CREATE by name
  server.route("/posts/comments/create/:post_title").put(commentController.createComment);
  //UPDATE
  server.route("/posts/comments/edit/:comment_id").put(commentController.updateComment);
  //DELETE
  server.route("/posts/comments/delete/:comment_id").delete(commentController.deleteComment);
};
