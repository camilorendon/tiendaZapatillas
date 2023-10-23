const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const productsRouter = require("./routes/products");
const pricesRouter = require("./routes/prices");

const port = process.env.PORT || 9000;

app.use(express.json());

app.use("/api", productsRouter);
app.use("/api", pricesRouter);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log("server listening on port", port));
