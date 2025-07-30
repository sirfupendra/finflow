import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Finflowform = () => {
  const navigate = useNavigate(); // Hook to navigate to another page
  const location = useLocation(); // Hook to access the current location
  const queryParams = new URLSearchParams(location.search); // Get query parameters from the URL
  const price = queryParams.get("price"); // Extract the price from the query parameters
  const [formData, setFormData] = useState({
    Name: "",
    AccountNumber: "",
    CardNumber: "",
    ExpiryDate: "",
    Cvv: "",
    Amount:price|| 0,
  });

  const [error, setError] = useState(null); // State to store error messages

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
        Balance: 15000,
        cvv:"789"
      },
    };

    try {
      const response = await axios.post("http://localhost:3020/customer-data", dataToSend);
      console.log("Form Data Submitted:", response.data);
      console.log("Response Data:", response.data.response.staus);
      if (response.data.response.staus === "valid") {
        // Redirect to PaymentSuccess page with response data
        navigate("/payment-success", { state: response.data.response });
      } else {
        // Handle failure response
        setError(response.data.response.message || "Payment failed. Please try again.");
      }

      // Clear the form
      setFormData({
        Name: "",
        AccountNumber: "",
        CardNumber: "",
        ExpiryDate: "",
        Cvv: "",
        Amount: 0,
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
      setError("An error occurred while processing your payment. Please try again.");
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
        className="w-full max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Payment Form
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Please fill in your details to proceed with the payment.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Account Number
            </label>
            <input
              type="number"
              name="AccountNumber"
              value={formData.AccountNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Enter your account number"
              required
              minLength="12"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Card Number
            </label>
            <input
              type="number"
              name="CardNumber"
              value={formData.CardNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Enter your card number"
              required
              minLength="12"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              name="ExpiryDate"
              value={formData.ExpiryDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">CVV</label>
            <input
              type="number"
              name="Cvv"
              value={formData.Cvv}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Enter CVV"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Amount</label>
            <input
              type="number"
              name="Amount"
              value={formData.Amount}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
          >
            Submit Payment
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 rounded-lg">
            <h3 className="text-lg font-bold text-red-800">Error</h3>
            <p className="text-gray-700 mt-2">{error}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Finflowform;