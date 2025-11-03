import express from "express";
import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();
const app = express();
app.use(express.json());

// Redis Client
const redis = new Redis(process.env.REDIS_URL);

// Simulated "Database"
let items = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" }
];

const CACHE_KEY = "items:all";

// GET /items → Fetch all items
app.get("/items", async (req, res) => {
  try {
    const cachedData = await redis.get(CACHE_KEY);
    if (cachedData) {
      console.log("✅ Cache Hit");
      return res.json(JSON.parse(cachedData));
    }

    console.log("❌ Cache Miss — Fetching from DB");
    await redis.set(CACHE_KEY, JSON.stringify(items), "EX", 60);
    res.json(items);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST /items → Add new item
app.post("/items", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });
  const newItem = { id: items.length + 1, name };
  items.push(newItem);

  await redis.del(CACHE_KEY);
  console.log("🗑️ Cache invalidated after POST");
  res.status(201).json(newItem);
});

// PUT /items/:id → Update item
app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const item = items.find(i => i.id === Number(id));
  if (!item) return res.status(404).json({ message: "Item not found" });
  item.name = name || item.name;

  await redis.del(CACHE_KEY);
  console.log("🗑️ Cache invalidated after PUT");
  res.json(item);
});

// DELETE /items/:id → Delete item
app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(i => i.id === Number(id));
  if (index === -1) return res.status(404).json({ message: "Item not found" });

  const deletedItem = items.splice(index, 1);
  await redis.del(CACHE_KEY);
  console.log("🗑️ Cache invalidated after DELETE");
  res.json({ message: "Item deleted", deletedItem });
});

// Server start
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
