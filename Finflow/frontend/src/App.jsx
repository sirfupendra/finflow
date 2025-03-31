import React from 'react'
import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import Shopsite from './pages/shopsite/shopsite';
import Finflowform from './pages/finflowform/Finflowform';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';

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
      </Routes>
    </Router>
      


    </div>
  )
}

export default App