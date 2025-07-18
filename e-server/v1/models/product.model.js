const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = new mongoose.Schema({
  productId: Number,
  title: String,
  brand: String,
  images: [],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  description: String,
  status: Number,
  price: Number,
  discountedPrice: Number,
  warranty: String,
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],
  sizes: [String],
  colors: [String],
  country: { type: String, default: "India" },
  quantity: Number,
});

productSchema.plugin(AutoIncrement, { inc_field: "productId" });

module.exports = mongoose.model("Product", productSchema);
