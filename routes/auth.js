const express = require("express");
const Users = require("../models/users");
const { login, createUser } = require("../controllers/authController");

const router = express.Router();

// register endpoint
router.post("/register", createUser);

// login endpoint
router.post("/login", login);

router.get("/getAllUsers", (req, res) => {
  res.json(Users.getAllUsers());
});

module.exports = router;
