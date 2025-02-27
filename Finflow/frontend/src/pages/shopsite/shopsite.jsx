import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Product A", price: 299 },
  { id: 2, name: "Product B", price: 499 },
  { id: 3, name: "Product C", price: 699 },
];

const ProductCards = () => {
  const navigate = useNavigate();

  const handleBuyNow = (price) => {
    navigate(`/finflowform?price=${price}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-8">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="border p-6 rounded-2xl shadow-lg w-72 text-center bg-white transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 text-lg font-medium mt-2">Price: ₹{product.price}</p>
          <button
            className="bg-blue-600 text-white px-5 py-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={() => handleBuyNow(product.price)}
          >
            Buy Now!!!
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
