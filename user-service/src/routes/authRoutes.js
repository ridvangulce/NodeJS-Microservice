const express = require("express");
const { loginUser, logoutUser } = require("../controllers/authController");
const { loginValidationSchema } = require("../validation/loginValidation");
const validationMiddleware = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Login rotası
router.post("/login", validationMiddleware(loginValidationSchema), loginUser);
router.post("/logout", authMiddleware, logoutUser);

module.exports = router;
