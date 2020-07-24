const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth");
const User = require("../models/user");
const Movie = require("../models/movie");
const Comment = require("../models/comment");

//ADD_COMMENT - add comment to a movie
router.post(
  "/api/users/:userId/movies/:movieId/comments",
  authenticateToken,
  async (req, res) => {
    console.log("adding comment");

    const { movieId } = req.params;
    console.log("movieId", movieId);
    console.log(req.body);

    const { text } = req.body;
    console.log("text", text);

    const userInDb = await User.findById(req.user.id);
    const movieInDb = await Movie.findOne({ movieId });

    const comment = await Comment.create({
      text,
      author: { id: req.user.id, username: userInDb.username },
    });

    if(!movieInDb) {
      await Movie.create()
    }

    movieInDb.comments.push(comment);
    await Movie.create(movieInDb);

    console.log("movieInDb", movieInDb);
    res.sendStatus(200).json(movieInDb);
    res.send({});
  }
);

module.exports = router;
