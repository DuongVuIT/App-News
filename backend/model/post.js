const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    content: {
      type: String,
      require: true,
      trim: true,
    },
    meta: {
      type: String,
      require: true,
      trim: true,
    },
    slug: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    tags: [String],
    author: {
      type: String,
      default: "Dai Duong",
    },
    thumbnail: {
      type: Object,
      url: {
        type: URL,
      },
      public_id: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Post", postSchema);
