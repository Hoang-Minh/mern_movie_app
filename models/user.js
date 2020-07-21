const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
    },
    avatar: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  console.log("pre-save");
  // signup, registration - add new user - do not modify password since password is brand new
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("salt", salt);
    const hash = await bcrypt.hash(this.password, salt);
    console.log("hash", hash);
    this.password = hash;
    next();
  } catch (error) {
    console.log(err);
    return next(err);
  }
});

UserSchema.methods.verifyPassword = function (password) {
  console.log("verify password");
  return bcrypt.compare(password, this.password);
};

// in order to use this passport-local-mongoose, the model needs username and password
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("users", UserSchema);
