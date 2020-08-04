const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const Comment = require("../models/comment");

module.exports = {
  authenticateToken: async (req, res, next) => {
    console.log("Authenticate Token");

    const token = req.cookies.token;
    console.log("token", token);

    if (token == null) return res.json({ isLoggedIn: false });

    try {
      console.log("Trying to find user");
      const foundUser = await jwt.verify(token, keys.ACCESS_TOKEN_SECRET);

      if (!foundUser) return res.sendStatus(403);
      console.log("found user", foundUser);
      req.user = foundUser;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  checkCommentOwnership: async (req, res, next) => {
    if (req.isAuthenticated()) {
      try {
        console.log("commentId", req.params.commentId);
        const foundComment = await Comment.findById(req.params.commentId);
        if (foundComment) {
          if (foundComment.author.id.equals(req.user.id)) {
            next();
          } else {
            next({ message: "comment not belong to this user" });
          }
        } else {
          next({ message: "comment not found" });
        }
      } catch (error) {
        console.log(error);
        next(error);
      }
    } else {
      next({ message: "User not authenticated" });
    }
  },
};
