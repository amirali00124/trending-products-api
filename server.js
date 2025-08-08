const express = require("express");
const cors = require("cors");
const fs = require("fs");
const https = require("https"); // <-- added for keep-alive

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

let products = require("./data.json");

// GET /trending endpoint with optional filters
app.get("/trending", (req, res) => {
  let results = products;

  const { category, platform, min_score, limit } = req.query;

  if (category) {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (platform) {
    results = results.filter(p => p.platform.toLowerCase() === platform.toLowerCase());
  }

  if (min_score) {
    results = results.filter(p => p.trend_score >= Number(min_score));
  }

  if (limit) {
    results = results.slice(0, Number(limit));
  }

  res.json(results);
});

app.get("/", (req, res) => {
  res.send({ message: "Trending Products API is running" });
});

// ✅ Self‑ping every 4 minutes to prevent Render sleep
if (process.env.RENDER) { // only run in deployed environment
  const SELF_URL = "https://trending-products-api.onrender.com";
  setInterval(() => {
    https.get(SELF_URL, res => {
      console.log(`[KeepAlive] Pinged self at ${new Date().toISOString()} — status: ${res.statusCode}`);
    }).on("error", err => {
      console.error("[KeepAlive] Error pinging self:", err.message);
    });
  }, 4 * 60 * 1000);
}

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
