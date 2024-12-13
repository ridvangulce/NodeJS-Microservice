const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Admin şeması
const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["superadmin", "admin"], default: "admin" }, // Yetki seviyesi
  },
  { timestamps: true }
);

// Şifreyi kaydetmeden önce hash'le
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
