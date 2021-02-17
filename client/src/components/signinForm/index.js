import React from "react";


function SignInForm() {
  return (
    <div className="main">
      <div className="main__div">
        <h1 className="main__h1">
          Because there's nothing worse than terrible movies...
        </h1>
        <h1>except for maybe burnt popcorn.</h1>
        <p className="main__p">
          Ready to get started? Create your account now.
        </p>
        <form className="form" action="" method="POST">
          <label for="uname"></label>
          <input
            className="form__input"
            type="text"
            id="uname"
            name="uname"
            placeholder="Username"
          />
          <label for="password"></label>
          <input
            className="form__input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
          <label for="confirmPassword"></label>
          <input
            className="form__input"
            type="password"
            id="confirmPassword"
            name="conformPassword"
            placeholder="Confirm password"
          />
          <input
            className="form__button"
            type="submit"
            value="CREATE ACCOUNT"
          />
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
