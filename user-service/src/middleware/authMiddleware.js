const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Authorization header kontrolü
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("Authorization header missing or invalid");
      return res.status(401).json({ message: "Access denied, token missing or invalid" });
    }

    // Token'ı header'dan çıkar
    const token = authHeader.split(" ")[1];

    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcı bilgilerini req.user'a ata
    req.user = decoded;

    console.log("Token successfully verified:", decoded);
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);

    // Hata türüne göre özel mesaj döndür
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

// Admin doğrulama middleware'i
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    console.log("Admin access granted");
    next(); // Admin ise devam et
  } else {
    console.warn("Access denied: Admin privileges required");
    res.status(403).json({ message: "Access denied, admin privileges required" });
  }
};

module.exports = { authMiddleware, verifyAdmin };
