const express = require('express');
const { loginUser } = require('../controllers/authController');
// const { logoutUser } = require("../controllers/authController");
const { loginValidationSchema } = require('../validation/loginValidation');
const validationMiddleware = require('../middleware/validationMiddleware');

const router = express.Router();

// Login rotası
router.post('/login', validationMiddleware(loginValidationSchema), loginUser);
// router.post("/logout", logoutUser);


module.exports = router;
