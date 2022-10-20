const { Order, CartItem } = require("../models/orderModel");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
  // console.log("Create Order: ", req.body.order);
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name address")
    .sort("-created")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      res.json(orders);
    });
};

exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((error, order) => {
      if (error || !order) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      req.order = order;
      next();
    });
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(order);
    }
  );
};

exports.listOrderPagination = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  Order.find()
    .populate("user", "_id name address")
    .sort("-created")
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Order not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};
