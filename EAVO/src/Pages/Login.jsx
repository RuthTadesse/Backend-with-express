import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials=true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.status) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h1 className="font-bold ml-4 mb-8 text-2xl text-gray-800">
          Log in to your EAVO account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="w-full max-w-2xl">
            <div className="flex justify-center border border-black overflow-hidden transition-all duration-300"></div>
          </div>

          <div className="border px-4 border-black overflow-hidden">
            <label htmlFor="email" className="block mb-1 pt-8 font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded px-3 focus:outline-none"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="border px-6 border-black overflow-hidden">
            <label htmlFor="password" className="block pt-8 mb-1 font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded px-3 focus:outline-none"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-5 font-bold rounded mb-12 hover:bg-purple-700"
          >
            Log in
          </button>
        </form>
        <div className="flex justify-center px-2 space-x-4 mb-4 mt-4">
          <div className="text-gray-800">or</div>
          <Link to="/forgotpassword" className="text-purple-800 font-bold underline hover:text-purple-900">
            Forgot Password
          </Link>
        </div>
        <div>
          <hr />
        </div>
        <div className="text-center mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-900 font-bold underline">
            Signup
          </Link>
          <div className="text-purple-700 font-bold text-center underline hover:text-purple-900">
            <a
              href="/login"
              className="text-purple-700 font-bold text-center underline hover:text-purple-900"
            >
              Log in with your organization
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
