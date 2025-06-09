const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/api/people", async (req, res) => {
  const search = req.query.search;

  if (!search) {
    return res.status(400).json({ error: "Missing 'search' query parameter" });
  }
  console.log(
    `https://swapi.info/api/people/?search=${encodeURIComponent(search)}`
  );

  try {
    const swapiRes = await fetch(
      `https://swapi.info/api/people/?search=${encodeURIComponent(search)}`
    );
    const data = await swapiRes.json();
    res.json(data);
  } catch (err) {
    console.error("SWAPI fetch error:", err);
    res.status(500).json({ error: "Failed to fetch from SWAPI" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
