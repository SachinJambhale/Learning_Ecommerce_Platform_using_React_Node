const _ = require("lodash");
const CustomerModel = require("../models/customer.model");
const { encrypt } = require("../helpers/encryption");

class CustomerCtrl {
  static pickCustomer(obj) {
    return _.pick(obj, [
      "_id",
      "customerId",
      "name",
      "mobile",
      "email",
      "gender",
      "status",
      "address",
      "avatar",
      "orders",
      "rating",
      "cardDetails",
      "dob",
      "createdAt",
      "createdBy",
    ]);
  }

  static createCustomer(req, res) {
    const data = req.body;
    if (data?.password) data.password = encrypt(data.password);
    if (req?.file) data.avatar = `customer-avatar/${req?.file?.filename}`;

    new CustomerModel(data)
      .save()
      .then((result) => {
        res.status(201).send({
          message: "customer created",
          data: CustomerCtrl.pickCustomer(result),
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "could not created customer", error: err });
      });
  } //createcustomer
  static updateCustomer(req, res) {
    const { id } = req.params;
    const data = req.body;
    if (data?.password) data.password = encrypt(data.password);
    if (req?.file) data.avatar = `customer-avatar/${req?.file?.filename}`;
    CustomerModel 
      .findOneAndUpdate({ _id: id }, data, { new: true })
      .then((result) => {
        res.status(200).send({
          message: "customer updated",
          data: CustomerCtrl.pickCustomer(result),
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "could not updated customer", error: err });
      });
  } //updatecustomer
  static deleteCustomer(req, res) {
    const { id } = req.params;
    CustomerModel
      .findOneAndUpdate({ _id: id }, { status: 2 }, { new: true })
      .then((result) => {
        res.status(200).send({
          message: "customer deleted",
          data: CustomerCtrl.pickCustomer(result),
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "could not deleted", error: err });
      });
  } //deletecustomer
  static fetchOneCustomer(req, res) {
    const { id } = req.params;
    CustomerModel.findOne({ _id: id, $or: [{ status: 0 }, { status: 1 }] })
      .populate("orders rating")
      .exec()
      .then((result) => {
        res.status(201).send({
          message: "customer Record",
          data: CustomerCtrl.pickCustomer(result),
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "The customer is not available", error: err });
      });
  } //fetchOnecustomer
  static fetchAllCustomer(req, res) {
    const { gender, status } = req.query;
    let filter = {};
    if (!status) filter = { $or: [{ status: 0 }, { status: 1 }] };
    if (gender) filter.gender = gender;
    if (status) filter.status = status;

    CustomerModel.find(filter)
      .populate("orders rating")
      .exec()
      .then((result) => {
        res.status(201).send({
          message: "customer List",
          data: _.map(result, CustomerCtrl.pickCustomer),
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "customer list is not available..", error: err });
      });
  } //fetchAllcustomer
}

module.exports = CustomerCtrl;
