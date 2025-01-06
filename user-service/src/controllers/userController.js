const User = require("../models/user.js");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { nameSurname, username, email, password } = req.body;

  try {
    const user = await User.create({ nameSurname, username, email, password });
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      const duplicateValue = error.keyValue[duplicateField];
      return res.status(400).json({
        message: `The ${duplicateField} '${duplicateValue}' is already in use. Please choose a different value.`,
      });
    }
    res.status(400).json({ message: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // MongoDB'deki tüm kullanıcıları getirir
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { nameSurname, username, email, password } = req.body;
    const updateFields = { nameSurname, username, email };

    // Eğer yeni bir şifre gönderilmişse bcrypt ile hashle
    if (password) {
      const salt = await bcrypt.genSalt(10); // Salt üret
      updateFields.password = await bcrypt.hash(password, salt); // Şifreyi hashle
    }

    // Kullanıcıyı güncelle
    const user = await User.findByIdAndUpdate(req.params.id, updateFields, {
      new: true, // Güncellenmiş kullanıcı döndürülsün
      runValidators: true, // Doğrulama çalıştırılsın
    });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {

  try {
    // ObjectId formatını doğrula
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      console.log("Invalid user ID format"); // Geçersiz ID formatını logla
      console.log(req.user.id);
      return res.status(400).json({ message: req.user.id });
    }

    // Kullanıcıyı bul
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      console.log("User not found"); // Kullanıcı bulunamazsa logla
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user); // Kullanıcı bulunduğunda logla
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserProfile:", error.message); // Hata logla
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
};
