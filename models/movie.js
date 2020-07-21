const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    movieId: {
      // this comes from the database that our api is using
      type: String,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    poster: String,
    plot: String,
  },
  { timestamps: true }
);

movieSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.users;
  return obj;
};

module.exports = mongoose.model("movies", movieSchema);
