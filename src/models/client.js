const mongoose = require("mongoose");

const specialPriceSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
});

module.exports = mongoose.model("Client", specialPriceSchema);
