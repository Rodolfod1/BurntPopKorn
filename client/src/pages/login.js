import React, { useContext, useRef, useState } from "react";
import "./login.css";
import LoginForm from "../components/loginForm";
import HeaderLogin from "../components/HeaderLogin";
import Footer from "../components/Footer";

function LogIn() {
  return (
    <div className="login__container">
      <HeaderLogin />
      <LoginForm />
      <Footer />
    </div>
  );
}

export default LogIn;
