const express = require("express");
const Client = require("../models/client");

const router = express.Router();

router.post("/price", async (req, res) => {
  const { userId, brand, specialPrice } = req.body;

  try {
    // Verificar si ya existe un precio especial para el usuario y la marca
    const existingSpecialPrice = await specialPrice.findOne({ userId, brand });
    if (existingSpecialPrice) {
      res.status(400).json({
        error: "There is already a special price for this user and brand.",
      });
      return;
    }

    const specialPriceDoc = new specialPrice({ userId, brand, specialPrice });
    await specialPriceDoc.save();

    res.json({ message: "Special price created successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error creating the special price." });
  }
});

// Obtener precio especial para un cliente y marca
router.get("/price/:user_id/:name_product", async (req, res) => {
  const { id, name } = req.params;

  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ error: "Client not found." });
    }

    const specialPrice = client.specialPrices.find(
      (price) => price.brand === name
    );

    if (specialPrice) {
      return res.json({ price: specialPrice.price });
    } else {
      return res.json({ price: "Base price" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error obtaining special price." });
  }
});

module.exports = router;
