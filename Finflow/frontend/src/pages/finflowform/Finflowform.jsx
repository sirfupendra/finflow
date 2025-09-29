import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Finflowform.module.css";

const Finflowform = () => {
  const navigate = useNavigate();
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

  const [error, setError] = useState(null);

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
        cvv: "789",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3020/customer-data",
        dataToSend
      );
      if (response.data.response.staus === "valid") {
        navigate("/payment-success", { state: response.data.response });
      } else {
        setError(
          response.data.response.message || "Payment failed. Please try again."
        );
      }
      setFormData({
        Name: "",
        AccountNumber: "",
        CardNumber: "",
        ExpiryDate: "",
        Cvv: "",
        Amount: 0,
      });
    } catch (error) {
      setError(
        "An error occurred while processing your payment. Please try again."
      );
    }
  };

  return (
    <div className={styles.formContainer}>
      <motion.div
        className={styles.formCard}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={styles.formTitle}>Payment Form</h2>
        <p className={styles.formSubtitle}>
          Please fill in your details to proceed with the payment.
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Account Number</label>
            <input
              type="number"
              name="AccountNumber"
              value={formData.AccountNumber}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Enter your account number"
              required
              minLength="12"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Card Number</label>
            <input
              type="number"
              name="CardNumber"
              value={formData.CardNumber}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Enter your card number"
              required
              minLength="12"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Expiry Date</label>
            <input
              type="text"
              name="ExpiryDate"
              value={formData.ExpiryDate}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>CVV</label>
            <input
              type="number"
              name="Cvv"
              value={formData.Cvv}
              onChange={handleChange}
              className={styles.formInput}
              placeholder="Enter CVV"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Amount</label>
            <input
              type="number"
              name="Amount"
              value={formData.Amount}
              readOnly
              className={styles.formInput}
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Submit Payment
          </button>
        </form>
        {error && (
          <div className={styles.errorBox}>
            <h3 className={styles.errorTitle}>Error</h3>
            <p className={styles.errorMsg}>{error}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Finflowform;