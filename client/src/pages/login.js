import React, { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.css";
import LoginForm from "../components/loginForm";
import HeaderLogin from "../components/HeaderLogin";

function LogIn() {
  return (
    <div className="login__container">
      <Link to="/">GO TO MAIN</Link>
      <HeaderLogin />
      <LoginForm />
    </div>
  );
}

export default LogIn;
