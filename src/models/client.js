const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: String,
  specialPrices: [
    {
      brand: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model("Client", clientSchema);
