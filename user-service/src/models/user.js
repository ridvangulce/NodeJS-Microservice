const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Şema tanımı
const userSchema = new mongoose.Schema(
  {
    nameSurname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"], // Sadece 'admin' veya 'user' değerlerini kabul eder
      default: "user", // Varsayılan olarak 'user'
    },
    permissionLevel: {
      type: Number,
      min: 1, // Minimum yetki seviyesi
      max: 10, // Maksimum yetki seviyesi
      default: 1, // Varsayılan yetki seviyesi
    },
  },
  { timestamps: true }
);

// Şema üzerinde 'save' middleware tanımı
userSchema.pre("save", async function (next) {
  // Parola değiştirilmediyse devam et
  if (!this.isModified("password")) return next();

  // Parolayı hash'le
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
