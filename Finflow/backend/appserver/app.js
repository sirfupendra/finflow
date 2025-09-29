const express = require('express');
const app = express();
const { createClient } = require("redis");
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
async function main() {
  await mongoose.connect('mongodb://localhost:27017/appdatabase');
  console.log('Database Connected');
}
main().catch(err => console.log(err));

// Product model
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
});
const Product = mongoose.model("Product", ProductSchema);

// Redis client
const redisClient = createClient();
redisClient.connect();
redisClient.on("error", (err) => console.log("Redis Error:", err));

// Test route
app.get('/', (req, res) => {
  res.send('hello from app server');
});

// Add product route (for testing)
app.get('/api/add-product', async (req, res) => {
  try {
    const newproduct = new Product({
      name: "laptop",
      price: 100,
      category: "Electronics",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAR_iPdYklDB_5VKgRKwgFYS5VmdSCCeA6dw&s"
    });
    await newproduct.save();
    res.json({ message: "Product saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get products with Redis cache
app.get("/api/products", async (req, res) => {
  try {
    const cacheData = await redisClient.get("products");
    if (cacheData) {
      return res.json({
        source: "cache",
        data: JSON.parse(cacheData),
      });
    }
 await new Promise(resolve => setTimeout(resolve, 5000));
    console.log("Waited 5 seconds");
    const products = await Product.find();
    await redisClient.setEx("products", 3600, JSON.stringify(products));
    return res.json({
      source: "database",
      data: products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear cache endpoint
app.get("/api/clear-cache", async (req, res) => {
  await redisClient.del("products");
  res.json({ message: "Cache cleared!" });
});

app.listen(3000, () => {
  console.log('App Server is running on port 3000');
});