const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/estore");

const conn = mongoose.connection;

conn.on("connected", () => {
    console.log("Connected to db...");
});
conn.on("error", (err) => {
    console.log("could not connected to db...", err);
});
conn.on("disconnected", () => {
    console.log("disconnected from db...");
});