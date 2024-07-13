import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  
  const { email } = location.state || {};

  useEffect(() => {
    
    if (!email) {
      navigate('/forgotpassword'); 
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/resetpassword', {
        email,
        password,
      });

      if (response.data.status) {
        navigate('/login'); 
      } else {
        setError(response.data.message || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('An error occurred. Please check the console for details.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold ml-4 mb-8">Reset Password</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="border px-6 border-black overflow-hidden">
            <label htmlFor="password" className="block mb-1 pt-8 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded px-3 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="border px-6 border-black overflow-hidden">
            <label htmlFor="confirmPassword" className="block mb-1 pt-8 font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full border rounded px-3 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-5 font-bold rounded mb-8 hover:bg-purple-700"
          >
            Reset Password
          </button>

          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
