import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ForgotOtp= () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/vreifyOtp', { email, otp });
      if (response.data.status) {
        setSuccess('OTP verified successfully.');
        
        navigate('/reset-password', { state: { email } });
      } else {
        setError('Invalid or expired OTP.');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to verify OTP. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
        <p>We have sent an OTP to {email}. Please enter the OTP below to verify your email.</p>
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Verify OTP
          </button>
        </form>
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {success && <p className="mt-4 text-green-600">{success}</p>}
      </div>
    </div>
  );
};

export default ForgotOtp;
