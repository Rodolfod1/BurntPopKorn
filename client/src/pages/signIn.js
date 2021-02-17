import React from "react";
import { Link } from "react-router-dom";
import "../components/HeaderSignIn/HeaderSignIn.css";
//import "../components/signinForm/SignInForm.css";
import "../components/Footer/Footer.css";
import HeaderSignIn from "../components/HeaderSignIn";
import SignInForm from "../components/signinForm";
import Footer from "../components/Footer";
import "./home.css";

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
