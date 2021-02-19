import React, { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../components/images/burntpopkorn logo.png";
import "./login.css";
import LoginForm from '../components/loginForm'
import HeaderSignIn from '../components/HeaderSignIn';

function LogIn() {

  return (
    <div className="login__container">
      <Link to="/">GO TO MAIN</Link>
      <div className="header">

      <HeaderSignIn />
      <LoginForm />
      </div>
    </div>
  );
}

export default LogIn;
