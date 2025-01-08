const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

// Secure API keys (stored server-side)
const RAWG_API_KEY = "c289e0883f6244b38247a1df7d73faf8";
const GAMESPOT_API_KEY = "d564e38d07dbbf7e5b3a6ace3f7c28690994f9af";

// Enable CORS (if accessing the server from a different domain)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Proxy for RAWG Featured Games
app.get("/api/featured-games", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=5`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch featured games" });
  }
});

// Proxy for RAWG Game Details
app.get("/api/game-details/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameId}?key=${RAWG_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game details" });
  }
});

// Proxy for GameSpot News
app.get("/api/news", async (req, res) => {
  try {
    const response = await fetch(
      `https://www.gamespot.com/api/articles/?api_key=${GAMESPOT_API_KEY}&format=json`,
      { mode: "cors" }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
