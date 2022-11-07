const CustomerModel = require("../models/customer.model");
const RatingModel = require("../models/rating.model");
const ProductModel = require("../models/product.model");

class RatingCtrl {
  static createRating(req, res) {
    const rating = req.body;
    new RatingModel(rating)
      .save()
      .then((result) => {
        if (result._id) {
          // add the rating id in the customer

          CustomerModel.findOneAndUpdate(
            { _id: rating.customer },
            { $push: { orders: result._id } },
            (err, custResult) => {
              if (err) console.log(err);
              else console.log("added rating id to customer ", custResult.name);
            }
          );
          // add the rating id in the product

          ProductModel.findOneAndUpdate(
            { _id: rating.product },
            { $push: { rating: result._id } },
            (err, custResult) => {
              if (err) console.log(err);
              else console.log("added rating id to product ", prodResult.name);
            }
          );
        }
        res.status(201).send({ message: "Rating created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Rating not created", error: err });
      });
  } //createRating
  static updateRating(req, res) {
    const { id } = req.params;
    const rating = req.body;

    RatingModel.findOneAndUpdate({ _id: id }, rating, { new: true })
      .then((result) => {
        res.status(201).send({ message: "Rating Updated", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "Rating not updated", error: err });
      });
  } //updateRating

  static deleteRating(req, res) {
    const { id } = req.params;

    RatingModel.findOneAndUpdate({ _id: id }, { status: 2 }, { new: true })
      .then((result) => {
        res.status(201).send({ message: "Order deleted", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "rating not deleted", error: err });
      });
  } //deleteOrder

  static fetchOneRating(req, res) {
    const { id } = req.params;

    RatingModel.findOne({ _id: id })
      .populate("customer product")
      .exec()
      .then((result) => {
        res.status(200).send({ message: "rating document", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "This rating is not available", error: err });
      });
  } //fetchOneOrder

  static fetchAllRating(req, res) {
    const { custId, prodId, status } = req.query;

    let filter = {};
    if (custId) filter.customer = custId;
    if (prodId) filter.product = prodId;
    if (status) filter.status = status;

    RatingModel.find(filter)
      .populate("customer product")
      .exec()
      .then((result) => {
        res.status(200).send({ message: "Rating List", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "The Ratings are not availabe", error: err });
      });
  } //fetchAllOrder
}

module.exports = RatingCtrl;
