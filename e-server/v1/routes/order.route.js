const router = require("express").Router();

const {
  createOrder,
  updateOrder,
  deleteOrder,
  fetchOneOrder,
  fetchAllOrder,
} = require("../controllers/order.controller");

router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/:id", fetchOneOrder);
router.get("/", fetchAllOrder);

module.exports = router;
