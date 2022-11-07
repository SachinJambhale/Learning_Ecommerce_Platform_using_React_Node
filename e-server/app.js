const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
require("./v1/models/db");
require("dotenv").config();
port = process.env.PORT || 8080;
app.use(bodyParser.json());

app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", ["x-token", "x-refresh"]);
  next();
});
app.use(express.static("uploads"));
app.get("/", (req, res) => {
  res.status(200).send(`Welcome  to estore server`);
});

// http://localhost:8888/api/v1/users
// or
// http://localhost:8080/api/v1/users
app.use("/api/v1/users", require("./v1/routes/user.route"));
app.use("/api/v1/customers", require("./v1/routes/customer.route"));
app.use("/api/v1/orders", require("./v1/routes/order.route"));
app.use("/api/v1/categories", require("./v1/routes/category.route"));
app.use("/api/v1/products", require("./v1/routes/product.route"));
app.use("/api/v1/ratings", require("./v1/routes/rating.route"));
app.use("/api/v1/auth", require("./v1/routes/auth.route"));

app.listen(port, () => console.log(`Server is listening on port ${port}`));
