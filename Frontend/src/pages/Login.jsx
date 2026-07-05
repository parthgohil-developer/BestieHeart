import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { login } from "../service/authService";
import roseImage from "../assets/Rose.png";

export default function Login({ title = "LOGIN", subtitle, authFunction = login, onSuccessRoute = "/home" }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authFunction(username, dob, password);
      navigate(onSuccessRoute);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#ffb6c1] text-white font-sans">
      {/* Left Side - Image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${roseImage})` }}
      ></div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="w-full max-w-md flex flex-col items-center bg-white/10 p-10 rounded-[2.5rem] backdrop-blur-md shadow-2xl border border-white/20"
        >
          <h1 className="text-4xl font-serif font-bold tracking-widest mb-2 shadow-sm text-white uppercase text-center">
            {title}
          </h1>
          {subtitle && (
            <p className="animate-alert-flash text-sm font-sans tracking-wide text-center max-w-xs leading-relaxed mb-4 font-bold">
              {subtitle}
            </p>
          )}

          {/* Divider Line */}
          <div className="w-full h-px bg-white/30 mb-8"></div>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-shadow"
              required
            />

            {/* Datepicker Wrapper */}
            <div className="w-full">
              <DatePicker
                selected={dob}
                onChange={(date) => setDob(date)}
                placeholderText="Date of Birth"
                className="w-full px-4 py-3 rounded-xl text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-shadow"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                required
              />
            </div>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-shadow"
              required
            />

            {error && (
              <p className="text-red-500 text-sm font-semibold">{error}</p>
            )}

            <div className="flex justify-center mt-6 mb-10">
              <button
                type="submit"
                disabled={loading}
                className="relative px-12 py-3 rounded-full text-lg font-bold text-white overflow-hidden shadow-lg transform transition-transform hover:scale-105 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  backgroundImage: `url(${roseImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Dark overlay to make text readable */}
                <div className="absolute inset-0 bg-black/30 rounded-full"></div>
                <span className="relative z-10">
                  {loading ? "Logging in..." : "Login"}
                </span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
