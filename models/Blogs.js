const { text } = require("express");
const mongoose = require("mongoose");

const BlogScheme = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    authorName: { type: String,required: true},
    topic:{ type: String, required: true},
    backgroundImage: { type: String, required: true },
  content: { type: String, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blogs", BlogScheme);