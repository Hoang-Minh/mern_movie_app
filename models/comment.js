const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    text: String,
    author: {
      id: { type: Schema.Types.ObjectId, ref: "user" },
      username: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentSchema);
