const express = require("express");
const router = express.Router();
const { listUsers, deleteUser, createUser } = require("../controllers/adminController");
const { authMiddleware, verifyAdmin } = require("../middleware/authMiddleware");

// Kullanıcıları listeleme (Admin yetkisi gerekli)
router.get("/users", authMiddleware, verifyAdmin, listUsers);

// Kullanıcı silme (Admin yetkisi gerekli)
router.delete("/users/:id", authMiddleware, verifyAdmin, deleteUser);

// Yeni kullanıcı oluşturma (Admin yetkisi gerekli)
router.post("/users", authMiddleware, verifyAdmin, createUser);

module.exports = router;
