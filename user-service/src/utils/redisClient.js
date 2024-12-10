const { createClient } = require("redis");

const client = createClient();

client.on("connect", () => {
  console.log("Redis connected successfully");
});

client.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Redis istemcisini başlat
(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();

module.exports = client;
