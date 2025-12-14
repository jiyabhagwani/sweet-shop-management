const express = require("express");
const prisma = require("../db/prisma");
const bcrypt = require("bcrypt");


const router = express.Router();

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // create user
    const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
  data: {
    email,
    password: hashedPassword,
    role: "USER",
  },
});


    res.status(201).json({
      message: "User registered successfully",
      userId: user.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      userId: user.id,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});


module.exports = router;


