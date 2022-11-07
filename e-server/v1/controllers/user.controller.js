const _ = require("lodash");
const UserModel = require("../models/user.model");
const { encrypt } = require("../helpers/encryption");

class UserCtrl {
  static pickUser(obj) {
    return _.pick(obj, [
      "_id",
      "userId",
      "name",
      "mobile",
      "email",
      "role",
      "gender",
      "status",
      "address",
      "avatar",
      "dob",
      "salary",
      "createdAt",
      "createdBy",
    ]);
  }

  static createUser(req, res) {
    const data = req.body;
    if (data?.password) data.password = encrypt(data.password);
    if (req?.file) data.avatar = `user-avatar/${req?.file?.filename}`;

    new UserModel(data)
      .save()
      .then((result) => {
        res
          .status(201)
          .send({ message: "User created", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "could not created user", error: err });
      });
  } //createUser

  static updateUser(req, res) {
    const { id } = req.params;
    const data = req.body;
    if (data?.password) data.password = encrypt(data.password);
    if (req?.file) data.avatar = `user-avatar/${req?.file?.filename}`;
    UserModel.findOneAndUpdate({ _id: id }, data, { new: true })
      .then((result) => {
        res
          .status(200)
          .send({ message: "User updated", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "could not updated user", error: err });
      });
  } //updateUser

  static deleteUser(req, res) {
    const { id } = req.params;
    UserModel.findOneAndUpdate({ _id: id }, { status: 2 }, { new: true })
      .then((result) => {
        res
          .status(200)
          .send({ message: "User deleted", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "could not deleted", error: err });
      });
  } //deleteUser

  static fetchOneUser(req, res) {
    const { id } = req.params;
    UserModel.findOne({ _id: id, $or: [{ status: 0 }, { status: 1 }] })
      .then((result) => {
        res
          .status(201)
          .send({ message: "User Record", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "The user is not available", error: err });
      });
  } //fetchOneUser

  static fetchAllUser(req, res) {
    const { gender, status, role } = req.query;
    let filter = {};
    if (!status) filter = { $or: [{ status: 0 }, { status: 1 }] };
    if (gender) filter.gender = gender;
    if (status) filter.status = status;
    if (role) filter.role = role;
    if (!role) filter.role = "admin";

    UserModel.find(filter)
      .then((result) => {
        res.status(201).send({
          message: "User List",
          data: _.map(result, UserCtrl.pickUser),
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "User list is not available..", error: err });
      });
  } //fetchAllUser
}

module.exports = UserCtrl;
