import React from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home/Home";
import Forgotpassword from "./Pages/Forgotpassword/Forgotpassword";
import Otp from "./Pages/verfyOtp/otp";
import ForgotOtp from "./Pages/Forgotpassword/ForgotPassworOtp";
import ResetPassword from "./Pages/Forgotpassword/passworReset";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="verfyEmail" element={<Otp/>}/>
        <Route path="/ForgotOtp" element={<ForgotOtp/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
      </Routes>
    </Router>
  );
}

export default App;
