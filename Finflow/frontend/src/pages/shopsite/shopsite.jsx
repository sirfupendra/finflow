import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "premium headset", price: 299, imageUrl: "https://th.bing.com/th/id/R.5ba3ff952aa272f34a4e112d0b118e20?rik=BU6HkAalggFTMA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f07%2fDownload-Free-Laptop-Background.jpg&ehk=RogjjpVfshw8tMVcVhscZzplPetrVdmAh3%2fmwJQPKtY%3d&risl=&pid=ImgRaw&r=0" },
  { id: 2, name: "Rolex Watch", price: 499, imageUrl: "https://th.bing.com/th/id/OIP.1a94MPDY7ZSDGALnEbDHTAHaEo?rs=1&pid=ImgDetMain" },
  { id: 3, name: "Necklace", price: 699, imageUrl: "https://wallpaperaccess.com/full/4609738.jpg" },
];

const ProductCards = () => {
  const navigate = useNavigate();

  const handleBuyNow = (price) => {
    navigate(`/finflowform?price=${price}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-8 p-8 bg-gray-100">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="border p-6 rounded-2xl shadow-lg w-80 text-center bg-white transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 text-lg font-medium mt-2">Price: ₹{product.price}</p>
            <button
              className="bg-blue-600 text-white px-5 py-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              onClick={() => handleBuyNow(product.price)}
            >
              Buy Now!!!
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;