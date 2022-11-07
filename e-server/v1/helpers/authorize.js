const { verifyToken } = require("./token");

function authorize(roles = []) {
  return (req, res, next) => {
    // access the token from request
    const { authorization: token } = req.headers;
    console.log("Auth ", token);

    // validate the token
    const payload = verifyToken(token);

    // if token is valid then return forbidden response
    if (!payload?.id) {
      res.status(403).send({ message: "Session expired! login again" });
    } else {
      // if current user has Permissions or role is available in roles array
      if (roles.includes(payload?.role)) next();
      // if current user has no permission then return authorized
      else res.status(401).send({ message: "You do not have permission" });
    }
  };
}

module.exports = authorize;
