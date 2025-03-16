import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    Name: '',
    AccountNumber: '',
    CardNumber: '',
    ExpiryDate: '',
    Cvv: '',
    Amount: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3005/customer/register', formData);
      console.log('Form Data Submitted:', response.data);
      // Handle success response
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Handle error response
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-blue-600 text-white">
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Create Your Bank Account
      </motion.h1>
      <motion.form 
        className="bg-white text-gray-800 p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Name</label>
          <input 
            type="text" 
            name="Name" 
            value={formData.Name} 
            onChange={handleChange} 
            className="w-full p-2 border rounded-lg"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Account Number</label>
          <input 
            type="number" 
            name="AccountNumber" 
            value={formData.AccountNumber} 
            onChange={handleChange} 
            className="w-full p-2 border rounded-lg"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Card Number</label>
          <input 
            type="number" 
            name="CardNumber" 
            value={formData.CardNumber} 
            onChange={handleChange} 
            className="w-full p-2 border rounded-lg"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Expiry Date</label>
          <input 
            type="text" 
            name="ExpiryDate" 
            value={formData.ExpiryDate} 
            onChange={handleChange} 
            className="w-full p-2 border rounded-lg"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">CVV</label>
          <input 
            type="number" 
            name="Cvv" 
            value={formData.Cvv} 
            onChange={handleChange} 
            className="w-full p-2 border rounded-lg"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Amount</label>
          <input 
            type="number" 
            name="Amount" 
            value={formData.Amount} 
            onChange={handleChange} 
            className="w-full p-2 border rounded-lg"
            required 
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </motion.form>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-8"
      >
        <Link to="/shopsite">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
            Go to Shop Site
          </button>
        </Link>
      </motion.div>
    </div>
  );
}

export default Register;