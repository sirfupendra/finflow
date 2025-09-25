import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const products = [
  // Electronics
  { id: 1, name: "Apple iPhone 14", price: 79999, imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80", category: "Electronics", featured: true },
  { id: 2, name: "Gaming Laptop", price: 89999, imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80", category: "Electronics" },
  { id: 3, name: "Smart TV", price: 34999, imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80", category: "Electronics" },
  { id: 4, name: "Bluetooth Speaker", price: 2999, imageUrl: "https://images.unsplash.com/photo-1512446733611-9099a758e0c2?auto=format&fit=crop&w=600&q=80", category: "Electronics" },
  { id: 5, name: "Canon DSLR Camera", price: 45999, imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80", category: "Electronics" },
  // Fashion
  { id: 6, name: "Nike Sneakers", price: 5999, imageUrl: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80", category: "Fashion", featured: true },
  { id: 7, name: "Designer Handbag", price: 15999, imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80", category: "Fashion" },
  // Accessories
  { id: 8, name: "Rolex Watch", price: 499, imageUrl: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=80", category: "Accessories", featured: true },
  { id: 9, name: "Premium Headset", price: 299, imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80", category: "Accessories" },
  { id: 10, name: "Necklace", price: 699, imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", category: "Accessories" }
];

const categories = ["Electronics", "Fashion", "Accessories"];

const ShopSite = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleBuyNow = (price) => {
    navigate(`/finflowform?price=${price}`);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const featured = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-10 text-center rounded-b-3xl mb-8 shadow-xl">
        <h1 className="text-5xl font-bold mb-2 tracking-wide text-balance">
          FinFlow Shopping
        </h1>
        <p className="text-xl mb-6 text-pretty">
          Discover top products and shop by category!
        </p>
        <input
          type="text"
          placeholder="Search products or categories..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-5 py-3 rounded-full border-none text-lg w-80 max-w-[90vw] shadow-md outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
        />
      </div>

      {/* Featured Products */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold my-8 text-blue-600 text-balance">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {featured.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 text-balance">{product.name}</h3>
                <p className="text-green-600 font-semibold text-xl mb-4">₹{product.price}</p>
                <button
                  className="bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold text-lg cursor-pointer transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => handleBuyNow(product.price)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Category Sections */}
        {categories.map(cat => (
          <div key={cat} className="mb-10">
            <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-balance">
              {cat}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.filter(p => p.category === cat && !p.featured).map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 text-balance">{product.name}</h3>
                    <p className="text-green-600 font-semibold text-base mb-3">₹{product.price}</p>
                    <button
                      className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold text-sm cursor-pointer transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      onClick={() => handleBuyNow(product.price)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
              {filteredProducts.filter(p => p.category === cat && !p.featured).length === 0 && (
                <p className="text-gray-600 italic p-4">No products found.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopSite;