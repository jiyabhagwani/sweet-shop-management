const express = require("express");
const prisma = require("../db/prisma");

const router = express.Router();

// ADD SWEET
router.post("/", async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({ message: "All fields required" });
    }

    const sweet = await prisma.sweet.create({
      data: {
        name,
        category,
        price,
        quantity,
      },
    });

    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Failed to add sweet" });
  }
});

// SEARCH SWEETS (IMPORTANT: before "/")
// SEARCH SWEETS
router.get("/search", async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const where = {};

    if (name) {
      where.name = { contains: name };
    }

    if (category) {
      where.category = { contains: category };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    const sweets = await prisma.sweet.findMany({ where });

    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
});
// PURCHASE SWEET
router.post("/:id/purchase", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const sweet = await prisma.sweet.findUnique({ where: { id } });

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    const updatedSweet = await prisma.sweet.update({
      where: { id },
      data: { quantity: sweet.quantity - 1 },
    });

    res.json(updatedSweet);
  } catch (error) {
    res.status(500).json({ message: "Purchase failed" });
  }
});
// RESTOCK SWEET
router.post("/:id/restock", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { quantity } = req.body;

    const addQuantity = quantity ? Number(quantity) : 1;

    const sweet = await prisma.sweet.findUnique({ where: { id } });

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    const updatedSweet = await prisma.sweet.update({
      where: { id },
      data: { quantity: sweet.quantity + addQuantity },
    });

    res.json(updatedSweet);
  } catch (error) {
    res.status(500).json({ message: "Restock failed" });
  }
});


// GET ALL SWEETS
router.get("/", async (req, res) => {
  try {
    const sweets = await prisma.sweet.findMany();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sweets" });
  }
});

module.exports = router;

