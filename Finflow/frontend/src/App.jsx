import React from 'react'
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import Shopsite from './pages/shopsite/shopsite';
import Finflowform from './pages/finflowform/Finflowform';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';
import AccountDetails from './pages/AccountDetails/AccountDetails';
import Login from './pages/Login/Login';

function App() {
  return (
   
    <div>
       <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/shopsite" element={<Shopsite />} />
        <Route path="/finflowform" element={<Finflowform />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/account" element={<AccountDetails />} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
      


    </div>
  )
}

export default App