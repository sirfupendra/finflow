import React from 'react'
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>
        <h1>welcome to Finflow , Payment Gatway project</h1>
        <Link to="/shopsite"><button>Now Go to site</button></Link>
    </div>
  )
}

export default Home