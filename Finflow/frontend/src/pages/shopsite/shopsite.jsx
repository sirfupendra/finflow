import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Shopsite() {
  const [products, setProducts] = useState([]);
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const handleBuyNow = (price) => {
    navigate(`/finflowform?price=${price}`);
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data.data);
      setSource(res.data.source);

      // extract unique categories
      const uniqueCats = ["All", ...new Set(res.data.data.map(p => p.category))];
      setCategories(uniqueCats);
    } catch (err) {
      console.error(err);
    }
  };

  const clearCache = async () => {
    await axios.get("http://localhost:3000/api/clear-cache");
    fetchProducts(); // reload from DB
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // filter by category
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🛒 Shopping Page</h1>
      <p>
        <strong>Data Source:</strong> {source.toUpperCase()}
      </p>

      <button onClick={clearCache} style={{ marginBottom: "20px" , borderRadius:"5px", padding:"10px", backgroundColor:"#007BFF", color:"white", border:"none", cursor:"pointer"}}>
        Clear Cache
      </button>

      <div style={{ marginBottom: "20px" }}>
        <label>Filter by Category: </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => handleBuyNow(product.price)}>Buy Now</button>
            <span style={{ fontSize: "14px", color: "gray" }}>
              {product.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shopsite;