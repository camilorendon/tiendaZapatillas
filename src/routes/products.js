const express = require("express");
const router = express.Router();
const Product = require("../models/product");

//Create products
router.post("/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProducts = await newProduct.save();
    res.json(savedProducts);
  } catch (err) {
    res.status(500).json({ error: "Error creating products" });
  }
});

// Obtener todos los productos en stock
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({ inStock: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error getting products in stock." });
  }
});

// //get a product

router.get("/products/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//update a product
router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, brand, price, inStock } = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { name, brand, price, inStock },
      { new: true } // Para obtener la versión actualizada del producto
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating product" });
  }
});

//delete a product

router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: id });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting product" });
  }
});

module.exports = router;
