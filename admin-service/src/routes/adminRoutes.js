const express = require("express");
const { createAdmin, loginAdmin } = require("../controllers/adminController");

const router = express.Router();

router.post("/register", (req, res, next) => {
    console.log("Register route triggered");
    next();
  }, createAdmin);
  

module.exports = router;
