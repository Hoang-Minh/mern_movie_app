const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const indexRoutes = require("./routes/index");
const movieRoutes = require("./routes/movie");
const commentRoutes = require("./routes/comment");
const keys = require("./config/keys");
const errorMiddlewares = require("./middlewares/error");

require("./config/passport")(passport);

const PORT = process.env.PORT || 5000;

mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser("chao buoi sang"));

app.use("/api/users/:userId/movies/", commentRoutes);
app.use("/api/user/movies", movieRoutes);
app.use(indexRoutes);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file or main.css file
  app.use(express.static("client/build"));

  // Express will serve up the index.html file if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(errorMiddlewares.notFound);
app.use(errorMiddlewares.errorHandler);

db.once("open", () => console.log("Database connected")).on(
  "error",
  () => "Database error"
);

// const posts = [
//   {
//     username: "minh",
//     title: "Post 1",
//   },
//   {
//     username: "Jim",
//     title: "Post 2",
//   },
// ];

// console.log(posts);

// app.get("/posts", authenticateToken, async (req, res) => {
//   console.log(posts);
//   console.log("req.user", req.user);
//   const { id } = req.user;
//   const currentUser = await User.findById(id);

//   console.log("current User", currentUser);

//   res.json(posts.filter((post) => post.username === currentUser.username));
// });

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
