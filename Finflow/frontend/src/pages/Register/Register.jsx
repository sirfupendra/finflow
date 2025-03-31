import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    Name: "",
    AccountNumber: "",
    CardNumber: "",
    ExpiryDate: "",
    Cvv: "",
    Amount: "",
  });

  const [responseMessage, setResponseMessage] = useState(null); // State to store the response message
  const [errorMessage, setErrorMessage] = useState(null); // State to store error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3005/customer/register",
        formData
      );
      console.log("Form Data Submitted:", response.data);

      // Show success message
      setResponseMessage(response.data.message || "Registration successful!");
      setErrorMessage(null); // Clear any previous error

      // Reset the form
      setFormData({
        Name: "",
        AccountNumber: "",
        CardNumber: "",
        ExpiryDate: "",
        Cvv: "",
        Amount: "",
      });
    } catch (error) {
      console.error("Error submitting form data:", error);

      // Show error message
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      setResponseMessage(null); // Clear any previous success message
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
        className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your account number"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your card number"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="MM/YY"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter CVV"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter initial deposit amount"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </motion.form>

      {/* Success Message */}
      {responseMessage && (
        <motion.div
          className="mt-6 p-4 bg-green-100 border border-green-400 rounded-lg text-green-800"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-bold">Success</h3>
          <p>{responseMessage}</p>
        </motion.div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <motion.div
          className="mt-6 p-4 bg-red-100 border border-red-400 rounded-lg text-red-800"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-bold">Error</h3>
          <p>{errorMessage}</p>
        </motion.div>
      )}

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