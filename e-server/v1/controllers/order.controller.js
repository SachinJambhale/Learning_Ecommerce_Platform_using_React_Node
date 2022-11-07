const OrderModel = require("../models/order.model");
const CustomerModel = require("../models/customer.model");

class OrderCtrl {
  static createOrder(req, res) {
    const order = req.body;
    new OrderModel(order)
      .save()
      .then((result) => {
        if (result._id) {
          CustomerModel.findOneAndUpdate(
            { _id: order.customer },
            { $push: { orders: result._id } },
            (err, custResult) => {
              if (err) console.log(err);
              else console.log("added order id to customer ", custResult.name);
            }
          );
        }
        res.status(201).send({ message: "Order created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Order not created", error: err });
      });
  } //createOrder
  static updateOrder(req, res) {
    const { id } = req.params;
    const order = req.body;

    OrderModel.findOneAndUpdate({ _id: id }, order, { new: true })
      .then((result) => {
        res.status(201).send({ message: "Order Updated", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "order not updated", error: err });
      });
  } //updateOrder

  static deleteOrder(req, res) {
    const { id } = req.params;

    OrderModel.findOneAndUpdate({ _id: id }, { status: 2 }, { new: true })
      .then((result) => {
        res.status(201).send({ message: "Order deleted", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "order not deleted", error: err });
      });
  } //deleteOrder

  static fetchOneOrder(req, res) {
    const { id } = req.params;

    OrderModel.findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Order document", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "This order is not available", error: err });
      });
  } //fetchOneOrder

  static fetchAllOrder(req, res) {
    const { custId, status } = req.query;

    let filter = {};
    if (custId) filter.customer = custId;
    if (status) filter.status = status;

    OrderModel.find(filter)
      .populate("customer")
      .exec()
      .then((result) => {
        res.status(200).send({ message: "Order List", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "The orders are not availabe", error: err });
      });
  } //fetchAllOrder
}

module.exports = OrderCtrl;
