import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // Import CSS module

function Login() {
  const [formData, setformdata] = useState({
    account: '',
    cvv: ''
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    setformdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3005/customer/login", formData);
    localStorage.setItem("customer", JSON.stringify(res.data.Customer));
    navigate('/account', { state: res.data.customer });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Enter the following details to see account details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="acc" className={styles.label}>Account Number</label>
        <input
          type="number"
          name="account"
          placeholder="Enter Account Number"
          value={formData.account}
          onChange={handlechange}
          className={styles.input}
        />

        <label htmlFor="cvv" className={styles.label}>CVV</label>
        <input
          type="number"
          name="cvv"
          placeholder="Enter CVV"
          value={formData.cvv}
          onChange={handlechange}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default Login;
