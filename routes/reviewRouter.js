const express = require("express");
const router = express.Router();

const {
  create,
  reviewById,
  read,
  remove,
  update,
  listReview,
  test,
} = require("../controllers/reviewController");
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/authController");

const { userById } = require("../controllers/userController");

const { productById } = require("../controllers/productController");

router.get("/review/:reviewId", read);

router.post("/review/create/:userId", requireSignin, isAuth, create);

router.delete("/review/:reviewId/:userId", requireSignin, isAuth, remove);

router.put("/review/:reviewId/:userId", requireSignin, isAuth, update);

router.get("/review/related/:productId", listReview);

router.param("reviewId", reviewById);
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
