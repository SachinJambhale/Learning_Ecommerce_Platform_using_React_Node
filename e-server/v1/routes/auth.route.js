const router = require("express").Router();
const {
  adminLogin,
  custLogin,
  validateToken,
  refreshToken,
} = require("../controllers/auth.controller");
router.post("/", adminLogin);
router.post("/cust", custLogin);
router.post("/validate-token", validateToken);
router.post("/refresh-token", refreshToken);

module.exports = router;
