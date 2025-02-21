const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const redisClient = require("../utils/redisClient");

const loginUser = async (req, res) => {
  const { login, password } = req.body;

  try {
    // Kullanıcıyı username veya email ile bul
    const user = await User.findOne({
      $or: [{ username: login }, { email: login }],
    });

    // Kullanıcı bulunamazsa hata döndür
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid username/email or password" });
    }

    // Şifreyi doğrula
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid username/email or password" });
    }

    // JWT oluştur
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log("Generated Token:", token); // Oluşturulan token'ı logla

    // Başarılı yanıt döndür
    res.status(200).json({ token });
  } catch (error) {
    // Sunucu hatası
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Token is required for logout" });
    }
    const token = authHeader.split(" ")[1];

    // Redis kullanıyorsanız, burada kara listeye ekleyebilirsiniz:
    // await redisClient.setex(token, 'blacklisted', process.env.JWT_EXPIRY);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Server error during logout" });
  }
};

module.exports = { loginUser, logoutUser };
