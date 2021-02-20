import React from "react";
import "../components/HeaderSignIn/HeaderSignIn.css";
import "../components/Footer/Footer.css";
import "../components/signinForm/SignInForm.css";
import HeaderSignIn from "../components/HeaderSignIn";
import SignInForm from "../components/signinForm";
import Footer from "../components/Footer";
import "./home.css";

function SignIn() {
  return (
    <div className="signinpage__container">
      <HeaderSignIn />
      <SignInForm />
      <Footer />
    </div>
  );
}

export default SignIn;
