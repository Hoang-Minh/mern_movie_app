const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = {
  generateAccessToken: (user) => {
    return jwt.sign(user, keys.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 }); // expires in 1 hour
  },
};
