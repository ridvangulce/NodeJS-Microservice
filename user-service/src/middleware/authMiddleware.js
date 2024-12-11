const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied, token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token çözme
    console.log("Decoded token:", decoded); // Token'den alınan bilgileri logla
    req.user = decoded; // `req.user`'a kullanıcı bilgilerini ata
    next();
  } catch (error) {
    console.error("Invalid or expired token:", error.message); // Hata logla
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
