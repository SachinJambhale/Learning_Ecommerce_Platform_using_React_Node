const UserModel = require("../models/user.model");
const CustomerModel = require("../models/customer.model");
const { compare } = require("../helpers/encryption");
const { createToken, verifyToken } = require("../helpers/token");
const UserCtrl = require("./user.controller");
const CustomerCtrl = require("./customer.controller");

class AuthCtrl {
  static adminLogin(req, res) {
    const { email, password } = req.body;
    UserModel.findOne({ email: email, status: 1 })
      .then((result) => {
        if (!result) {
          res.status(404).send({
            error: null,
            message: "User is disabled or not available",
          });
        } else {
          if (result.password && compare(password, result.password)) {
            //   email and password are correct
            //   generate a token(json web token -jwt)
            const accessToken = createToken(
              {
                id: result._id,
                role: result.role,
                ua: req.headers["user-agent"],
              },
              60 * 10
            );
            const refreshToken = createToken(
              {
                id: result._id,
                role: result.role,
                ua: req.headers["user-agent"],
              },
              60 * 25
            );
            //   add a token in header
            res.set("x-token", accessToken);
            res.set("x-refresh", refreshToken);
            // send the response
            res.status(200).send({
              data: UserCtrl.pickUser(result),
              message: "Login Successful",
            });
          } else {
            res.status(404).send({ error: null, message: "Invalid Password" });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ error: null, message: "Could Not login,try again" });
      });
  } //adminLogin

  static custLogin(req, res) {
    const { email, password } = req.body;
    CustomerModel.findOne({ email: email, status: 1 })
      .then((result) => {
        if (!result) {
          res.status(404).send({
            error: null,
            message: "customer is disabled or not available..",
          });
        } else {
          if (result.password && compare(password, result.password)) {
            //   email and password are correct
            //   generate a token(json web token -jwt)

            const accessToken = createToken(
              {
                id: result._id,
                role: result.role,
                ua: req.headers["user-agent"],
              },
              60 * 10
            );

            const refreshToken = createToken(
              {
                id: result._id,
                role: result.role,
                ua: req.headers["user-agent"],
              },
              60 * 25
            );
            // add a token in header
            res.set("x-token", accessToken);
            res.set("x-refresh", refreshToken);
            // send the response
            res.status(200).send({
              data: UserCtrl.pickUser(result),
              message: "Login Successful",
            });
          } else {
            res.status(404).send({ error: null, message: "Invalid Password" });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ error: null, message: "Could Not login,try again" });
      });
  } //custLogin

  static validateToken(req, res) {
    const { token } = req.body;
    const payload = verifyToken(token);
    if (payload && payload.id && payload.ua == req.headers["user-agent"]) {
      // token is valid
      res
        .status(200)
        .send({ message: "Valid Token", data: { id: payload.id } });
    } else {
      // token invalid
      // forbidden error
      res.status(403).send({ message: "Invalid token", error: null });
      // unauthorized
    }
  } //validate token

  static refreshToken(req, res) {
    const { refreshT } = req.body;

    const { id, role, ua } = verifyToken(refreshT);

    if (!id) {
      // refresh token is expired
      res.status(440).send({ message: "session expired!", error: null });
    } else {
      // access token
      const access = createToken({ id, role, ua }, 600);
      const refresh = createToken({ id, role, ua }, 60 * 25);

      res.status(200).send({ message: "Tokens", data: { access, refresh } });
    }
  }
}

module.exports = AuthCtrl;
