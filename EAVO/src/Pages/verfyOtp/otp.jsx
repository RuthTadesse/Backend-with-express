import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, username, password } = location.state || {};
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/vreifyOtp', {
        email,
        otp,
      });
      if (response.data.status) {
        console.log("OTP Verified");

        const signupResponse = await axios.post("http://localhost:3000/auth/signup", {
          username,
          email,
          password,
        });

        if (signupResponse.data.status) {
          navigate('/login');
        }
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to verify OTP. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold ml-4 mb-8">Verify Your Email</h1>
        <p>We have sent an OTP to {email}. Please enter the OTP to verify your email.</p>
        <form className="space-y-4" onSubmit={handleOtpSubmit}>
          <div className="border px-6 border-black overflow-hidden transition-all duration-300">
            <label htmlFor="otp" className="block mb-1 pt-8 font-semibold">OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              className="w-full px-3 focus:outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-5 font-bold rounded mb-8 hover:bg-purple-700"
          >
            Verify OTP
          </button>
        </form>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default Otp;
