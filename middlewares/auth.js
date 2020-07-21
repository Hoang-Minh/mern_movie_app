const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

module.exports = {
  authenticateToken: async (req, res, next) => {
    console.log("Authenticate Token");

    const token = req.cookies.token;
    console.log("token", token);

    if (token == null) return res.sendStatus(401);

    try {
      console.log("Trying to find user");
      const foundUser = await jwt.verify(token, keys.ACCESS_TOKEN_SECRET);

      if (!foundUser) return res.sendStatus(403);
      console.log("found user");
      req.user = foundUser;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
