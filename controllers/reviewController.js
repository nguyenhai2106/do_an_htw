const { errorHandler } = require("../helpers/dbErrorHandler");
const Category = require("../models/categoryModel");
const ReviewModel = require("../models/ReviewModel");
const Review = require("../models/ReviewModel");

exports.create = (req, res) => {
  const review = new Review(req.body);
  review.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.reviewById = (req, res, next, id) => {
  Review.findById(id).exec((err, review) => {
    if (err || !review) {
      return res.status(400).json({ error: "Review not found!" });
    }
    req.review = review;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.review);
};

exports.remove = (req, res) => {
  let review = req.review;
  review.remove((err, deletedReview) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Review deleted succesfully!",
    });
  });
};

exports.listReview = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  ReviewModel.find({
    product: req.product._id,
  })
    .limit(limit)
    .populate("product", "_id name")
    .exec((err, reviews) => {
      if (err) {
        return res.status(400).json({
          error: "Review not found!",
        });
      }
      res.send(reviews);
    });
};

exports.update = (req, res) => {
  console.log(req.review);
  const review = req.review;
  review.description = req.body.description;
  review.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};
