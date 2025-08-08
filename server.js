const express = require("express");
const cors = require("cors");
const fs = require("fs");

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

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
