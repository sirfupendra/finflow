import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios';

const Finflowform = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const price = queryParams.get("price");

  const [formData, setFormData] = useState({
    Name: "",
    AccountNumber: "",
    CardNumber: "",
    ExpiryDate: "",
    Cvv: "",
    Amount: price || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      customerobjectdata: formData,
      merchantobjectdata: {
        Name: "Rahul Sharma",
        AccountNumber: "123456789012",
        Balance: 15000
      }
    };

    try {
      const response = await axios.post('http://localhost:3020/customer-data', dataToSend);
      console.log('Form Data Submitted:', response.data);
      // Handle success response
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Handle error response
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-600 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Payment Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Account Number</label>
            <input
              type="number"
              name="AccountNumber"
              value={formData.AccountNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
              minLength="12"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Card Number</label>
            <input
              type="number"
              name="CardNumber"
              value={formData.CardNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
              minLength="12"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Expiry Date</label>
            <input
              type="text"
              name="ExpiryDate"
              value={formData.ExpiryDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CVV</label>
            <input
              type="number"
              name="Cvv"
              value={formData.Cvv}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              name="Amount"
              value={formData.Amount}
              readOnly
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Finflowform;