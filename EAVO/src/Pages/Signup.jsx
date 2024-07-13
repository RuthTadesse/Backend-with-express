import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/emailVerfy", { email })
      .then((response) => {
        if (response.data.status) {
          navigate('/verfyEmail', { state: { email, username, password } });
        } else {
          console.error('Error:', response.data.message);
          alert('Failed to send OTP. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        alert('Error sending OTP. Please check the console for details.');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold ml-4 mb-8">Sign up and join our Team</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="border px-6 border-black overflow-hidden transition-all duration-300">
            <label htmlFor="username" className="block mb-1 pt-8 font-semibold">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="border px-6 border-black overflow-hidden">
            <label htmlFor="email" className="block mb-1 pt-8 font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded px-3 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="border px-6 border-black overflow-hidden">
            <label htmlFor="password" className="block mb-1 pt-8 font-semibold">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded px-3 focus:outline-none"
              onChange={(e) => {
                setPassword(e.target.value);
                console.log(email);
              }}
              required
            />
          </div>
          <div>
            <input
              type="checkbox"
              id="special-offers"
              name="special-offers"
              className="mr-2 ml-2 border-black"
            />
            <label className="text-2xl font-normal" htmlFor="special-offers">
              Send me special offers, personalized recommendations, and helping tips
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-5 font-bold rounded mb-8 hover:bg-purple-700"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-8 text-gray-800 text-lg mb-10">
          <p>By signing up, you agree to our Terms of use and Privacy Policy.</p>
        </div>
        <div><hr /></div>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-900 font-bold underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
