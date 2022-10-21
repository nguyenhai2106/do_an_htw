const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");

require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRouter");
const userRoutes = require("./routes/userRouter");
const categoryRoutes = require("./routes/categoryRouter");
const productRoutes = require("./routes/productRouter");
const braintreeRoutes = require("./routes/braintreeRouter");
const orderRouter = require("./routes/orderRouter");
const reviewRouter = require("./routes/reviewRouter");

// App
const app = express();

//Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"));

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRouter);
app.use("/api", reviewRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
