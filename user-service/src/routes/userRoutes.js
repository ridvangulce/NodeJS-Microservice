const express = require("express");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
} = require("../controllers/userController.js");

const { userValidationSchema } = require("../validation/userValidation.js");

const validationMiddleware = require("../middleware/validationMiddleware.js");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.get('/profile', authMiddleware, getUserProfile);

router.post("/", validationMiddleware(userValidationSchema), createUser);

// router.get("/all-users", getUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);



module.exports = router;
