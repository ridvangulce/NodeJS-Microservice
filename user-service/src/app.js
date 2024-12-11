const express = require("express");
const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Next.js uygulamanızın adresi
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

module.exports = app;
