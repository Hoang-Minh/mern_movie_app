const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  checkCommentOwnership,
} = require("../middlewares/auth");
const User = require("../models/user");
const Movie = require("../models/movie");
const Comment = require("../models/comment");

//ADD_COMMENT - add comment to a movie
router.post("/:movieId/comments", authenticateToken, async (req, res) => {
  console.log("adding comment");
  const { movieId } = req.params;
  console.log("movieId", movieId);
  console.log(req.body);
  const { text, movie } = req.body;
  console.log("text", text);

  // find movie, if not, create one
  const movieInDb = await Movie.findOne({ movieId });
  let createdMovie;

  if (!movieInDb) {
    createdMovie = await Movie.create({
      title: movie.title,
      movieId: movie.id,
      poster: movie.poster_path,
      plot: movie.overview,
    });
  } else {
    createdMovie = movieInDb;
  }

  // find user
  const userInDb = await User.findById(req.user.id);

  const comment = await Comment.create({
    text,
    author: {
      id: req.user.id,
      username: userInDb.username,
      avatar: userInDb.avatar,
    },
  });

  createdMovie.comments.push(comment);
  await createdMovie.save();

  console.log("movieInDb", createdMovie);
  const commentId = comment.id;
  const commentInDb = await Comment.findById(commentId)
    .populate("author")
    .exec();
  res.status(200).json(commentInDb);
});

router.delete(
  "/:movieId/comments/:commentId",
  authenticateToken,
  checkCommentOwnership,
  async (req, res) => {
    try {
      console.log("delete route");
      const foundComment = await Comment.findById(req.params.commentId);
      foundComment.remove(); // does not need to check here since the checkCommentOwnership has done it
      const movie = await Movie.findOne({ movieId: req.params.movieId });
      if (!movie) return res.status(404).send({ error: "movie not found" });

      await Movie.updateOne(
        {},
        { $pull: { comments: req.params.commentId } },
        { new: true }
      );
      console.log("comment removed", foundComment);
      res.status(200).json(foundComment);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
