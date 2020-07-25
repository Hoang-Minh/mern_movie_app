const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const router = express.Router();
const Movie = require("../models/movie");
const User = require("../models/user");

// add fav movie to a current user
router.post("/api/user/movies", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    //console.log(id);
    const userInDb = await User.findById(id);

    const { title, movieId, plot, poster } = req.body;
    //console.log(movieId);
    let movie;
    const exists = await Movie.exists({ movieId });

    //console.log("exists", exists);

    if (!exists) {
      movie = new Movie({ title, movieId, plot, poster });
    } else {
      movie = await Movie.findOne({ movieId });
    }

    movie.users.push(userInDb);
    await movie.save();

    const movieInDb = await Movie.findById(movie.id);

    res.status(200).json(movieInDb);
  } catch (error) {
    console.log(error);
  }
});

// delete fav movie
router.delete(
  "/api/user/movies/:movieId",
  authenticateToken,
  async (req, res) => {
    try {
      const { movieId } = req.params;

      const movieInDb = await Movie.findOne({ movieId });

      if (!movieInDb) return res.status(404).send("Movie not found");
      //console.log("movie deleted", movieInDb);
      movieInDb.remove();

      await User.updateOne(
        {},
        { $pull: { favMovies: movieInDb.id } },
        { new: true }
      );
      res.status(200).json({ movieInDb });
    } catch (error) {
      console.log(error);
    }
  }
);

// get all fav movies for this current user
router.get("/api/user/movies", authenticateToken, async (req, res) => {
  const movies = await Movie.find({ users: req.user.id });
  //console.log(movies);
  res.json(movies);
});

// FETCH_COMMENTS for a movie
router.get("/api/movies/:movieId", async (req, res) => {
  try {
    console.log("/api/movies/:movieId");
    //console.log("req.params", req.params.movieId);
    const { movieId } = req.params;
    console.log(movieId);
    const movieInDb = await Movie.findOne({ movieId })
      .populate("comments")
      .populate("author")
      .exec();

    if (!movieInDb) return res.status(200).json([]);
    const comments = movieInDb.comments;
    console.log("comments", comments);
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
