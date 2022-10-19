const mongoose = require("mongoose");
const User = require("./userModel");
const Product = require("./productModel");
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
