const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Erişim reddedildi, token eksik" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Erişim reddedildi, yalnızca admin" });
    }

    req.user = user; // Kullanıcı bilgilerini req'e ekle
    next();
  } catch (error) {
    res.status(401).json({ message: "Geçersiz veya süresi dolmuş token" });
  }
};

module.exports = adminAuthMiddleware;
