import React from "react";

import "../components/HeaderSignIn/HeaderSignIn.css";
import "../components/SignInForm/SignInForm.css";
import "../components/Footer/Footer.css";
import HeaderSignIn from "../components/HeaderSignIn";
import SignInForm from "../components/SignInForm";
import Footer from "../components/Footer";
import "./home.css";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div className="signinpage__container">
      <Link to="/">GO TO MAIN</Link>
      <HeaderSignIn />
      <SignInForm />
      <Footer />
    </div>
  );
}

export default SignIn;
