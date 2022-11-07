const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const customerSchema = new mongoose.Schema({
    customerId: Number,
    name: {
        first: String,
        last: String
    },
    mobile: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    avatar: { type: String },
    status: Number,
    gender: String,
    dob: { type: Date },
    address: {
        street: String,
        city: String,
        country: String,
        pincode: Number
    },
    cardDetails: {
        cardNumber: Number,
        cardHolder: String,
        cardType: String,
        cvv: Number,
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    rating: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.SchemaTypes.ObjectId },
});
customerSchema.plugin(AutoIncrement, { inc_field: "customerId" });

module.exports = mongoose.model("Customer", customerSchema);