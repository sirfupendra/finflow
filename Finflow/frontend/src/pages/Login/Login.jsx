import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { useNavigate} from'react-router-dom'
function Login() {
    const [formData,setformdata]=useState({
        account:'',
        cvv:''
    });

    const navigate=useNavigate()
    const handlechange=(e)=>{
        setformdata((prev)=>({
            ...prev,
           [e.target.name]:e.target.value

        }))
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const res= await axios.post("http://localhost:3005/customer/login", formData);
        console.log(res);
        navigate('/account' ,{state:res.data});
    }

  return (
    <div>
        <h2>Enter the following details to see account details</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="acc">ACC: Number</label>
            <input type="number" placeholder='enter acc Number' value={formData.account}  onChange={handlechange} name="account" />
            <label htmlFor="cvv">Cvv</label>
            <input type="number" placeholder='enter Cvv' value={formData.cvv} onChange={handlechange} name="cvv" />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Login