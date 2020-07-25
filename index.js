const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const indexRoutes = require("./routes/index");
const movieRoutes = require("./routes/movie");
const commentRoutes = require("./routes/comment");
const keys = require("./config/keys");

require("./config/passport")(passport);

const PORT = process.env.PORT || 5000;

mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(flash());
app.use(cookieParser("chao buoi sang"));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.currentUserTest = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

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
