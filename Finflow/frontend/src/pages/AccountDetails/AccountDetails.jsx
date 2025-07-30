"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AccountDetails.css" // Add this import

function AccountDetails() {
  const navigate = useNavigate()
  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem("customer")
    if (stored) {
      setCustomer(JSON.parse(stored))
    } else {
      navigate("/login")
    }
  }, [navigate])

  if (!customer) return <p className="loading-text">Loading...</p>

  return (
    <div className="account-container">
      <div className="account-card">
        <h2 className="account-title">Account Details</h2>

        <div className="account-info">
          <strong className="info-label">Name:</strong>
          <span className="info-value">{customer.Name}</span>
        </div>

        <div className="account-info">
          <strong className="info-label">Account Number:</strong>
          <span className="info-value">{customer.AccountNumber}</span>
        </div>

        <div className="account-info">
          <strong className="info-label">Amount:</strong>
          <span className="info-value amount-value">₹{customer.Amount}</span>
        </div>

        <div className="account-info">
          <strong className="info-label">Card Number:</strong>
          <span className="info-value card-number-value">{customer.CardNumber}</span>
        </div>

        <div className="account-info">
          <strong className="info-label">CVV:</strong>
          <span className="info-value cvv-value">{customer.Cvv}</span>
        </div>

        <div className="account-info">
          <strong className="info-label">Expiry Date:</strong>
          <span className="info-value">{customer.ExpiryDate}</span>
        </div>
      </div>
    </div>
  )
}

export default AccountDetails
