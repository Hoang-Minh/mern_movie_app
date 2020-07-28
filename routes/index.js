const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const key = require("../config/keys");
const { generateAccessToken } = require("../util/token");
const User = require("../models/user");
const { authenticateToken } = require("../middlewares/auth");

router.post("/api/signup", async (req, res, next) => {
  console.log("sign up route");

  try {
    const { username, email, password, firstName, lastName, avatar } = req.body;
    console.log(username, email, password);

    // check if email has been registered
    const hasUser = await User.exists({ email });

    if (hasUser) {
      res.status(400);
      throw new Error("Email has been taken");
    }

    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      avatar,
    });
    await user.save();

    console.log("id", user.id);
    const { id } = user;
    const token = generateAccessToken({ id });

    const refreshToken = jwt.sign({ id }, key.REFRESH_TOKEN_SECRET);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("token", token);
    res.cookie("refreshToken", refreshToken);

    const userInDb = await User.findById(id);
    console.log("send token and user object back");

    res.status(200).send({ token, id, username: userInDb.username });
  } catch (error) {
    next(error);
  }
});

// login route
router.post(
  "/api/signin",
  passport.authenticate("local", {
    session: false,
    failureRedirect: "/signin",
  }),
  async function (req, res) {
    try {
      console.log("/api/signin");
      //console.log("current user", req.user);

      const { id } = req.user;
      //console.log("id", id);

      const foundUser = await User.findById(id);

      const { username } = foundUser;

      const token = generateAccessToken({ id });
      const refreshToken = jwt.sign({ id }, key.REFRESH_TOKEN_SECRET);

      res.cookie("token", token);
      res.cookie("refreshToken", refreshToken);

      res.status(200).send({
        token,
        id,
        username,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/api/check_logged_in", authenticateToken, async (req, res) => {
  console.log("/api/check_logged_in");
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    console.log("token from cookies", req.cookies.token);

    const { token } = req.cookies;

    res.json({ token: token, id: user.id, username: user.username });
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/signout", (req, res) => {
  console.log("/api/signout");
  req.logOut();
  res.json({});
});

router.get("/api/clear_cookies", (req, res) => {
  console.log("/api/clear_cookies");
  res.clearCookie("token");
  res.send("cookies cleared");
});

module.exports = router;
