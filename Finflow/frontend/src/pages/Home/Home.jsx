"use client"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>

      {/* Floating background shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-300/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-blue-300/15 rounded-full blur-lg animate-pulse delay-500"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Finflow, Payment Gateway Project
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-12 text-blue-100 font-light leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          To get started, please create an account for your bank.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link to="/register">
            <button className="group relative bg-white/95 backdrop-blur-sm text-blue-700 px-8 py-4 rounded-2xl shadow-2xl hover:shadow-blue-500/25 hover:bg-white transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 font-semibold text-lg min-w-[220px] border border-white/20">
              <span className="relative z-10">Create Bank Account</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>

          <Link to="/shopsite">
            <button className="group relative bg-white/95 backdrop-blur-sm text-purple-700 px-8 py-4 rounded-2xl shadow-2xl hover:shadow-purple-500/25 hover:bg-white transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 font-semibold text-lg min-w-[220px] border border-white/20">
              <span className="relative z-10">Go to Shop Site</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>

          <Link to="/login">
            <button className="group relative bg-white/95 backdrop-blur-sm text-indigo-700 px-8 py-4 rounded-2xl shadow-2xl hover:shadow-indigo-500/25 hover:bg-white transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 font-semibold text-lg min-w-[220px] border border-white/20">
              <span className="relative z-10">Login to Your Account</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  )
}

export default Home
