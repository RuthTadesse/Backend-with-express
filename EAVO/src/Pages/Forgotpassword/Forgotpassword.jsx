import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Forgotpassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post("http://localhost:3000/auth/forgotpassword", { email });

      if (response.data.message === "User exists") {
        
        try {
          const otpResponse = await axios.post("http://localhost:3000/auth/emailVerfy", { email });

          if (otpResponse.data.status) {
            
            navigate('/ForgotOtp', { state: { email } });
          } else {
            console.error('Error sending OTP:', otpResponse.data.message);
            alert('Failed to send OTP. Please try again.');
          }
        } catch (otpError) {
          console.error('Error sending OTP:', otpError);
          alert('Error sending OTP. Please check the console for details.');
        }
      } else {
        console.error('Error:', response.data.message);
        alert('User not found. Please check the email address.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please check the console for details.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold ml-4 mb-8">Forgot Password</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="border px-6 border-black overflow-hidden">
            <label htmlFor="email" className="block mb-1 pt-8 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded px-3 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-5 font-bold rounded mb-8 hover:bg-purple-700"
          >
            Send Reset Code
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgotpassword;
