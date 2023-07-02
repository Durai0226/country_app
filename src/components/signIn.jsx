import React, { useEffect, useState } from "react";
import eye from "../assets/Svg/eye.svg";
import facebook from "../assets/Svg/facebook.svg";
import google from "../assets/Svg/google.svg";
import linkedin from "../assets/Svg/linkedin.svg";
import twitter from "../assets/Svg/twitter.svg";
import front from "../assets/Svg/illustration.svg";
import "../styles/signIn.css";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setUsername, setPassword, clearAuthData } from "../Redux/store";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const username = useSelector((state) => state.auth.username);
  const password = useSelector((state) => state.auth.password);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [usernameValidationError, setUsernameValidationError] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve data from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    const storedEmail = localStorage.getItem("email");

    // Perform validation
    let isValid = true;

    if (username.trim() === "") {
      setUsernameValidationError("Username or email is required");
      isValid = false;
    } else {
      // Check if the input is a valid email address
      const isEmail = /\S+@\S+\.\S+/.test(username);

      if (isEmail) {
        // If it's an email, compare with the storedEmail
        if (username !== storedEmail) {
          setUsernameValidationError("Invalid email or password");
          isValid = false;
        }
      } else {
        // If it's a username, compare with the storedUsername
        if (username !== storedUsername) {
          setUsernameValidationError("Invalid username or password");
          isValid = false;
        }
      }
    }

    if (password.trim().length < 6) {
      setPasswordValidationError("Password required");
      isValid = false;
    }

    if (isValid) {
      if (
        (username !== storedUsername && username !== storedEmail) ||
        password !== storedPassword
      ) {
        setUsernameValidationError("Invalid username, email, or password");
        toast.error("Invalid username, email, or password");
      } else {
        if (keepSignedIn) {
          // Store username and password in localStorage
          localStorage.setItem("keepSignedIn", true);
        }
        // Reset form values
        dispatch(setUsername(""));
        dispatch(setPassword(""));

        setUsernameValidationError("");
        setPasswordValidationError("");

        // Update sign-in success state
        toast.success("Sign In is successful!");

        setTimeout(() => {
          navigate("/countryList"), 3000;
        });
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("keepSignedIn") === "true") {
        navigate("/countryList");
      }
    }, 2000);
  }, []);
  const handleUsernameChange = (e) => {
    dispatch(setUsername(e.target.value));
    setUsernameValidationError("");
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
    setPasswordValidationError("");
  };

  const handleSignUpLinkClick = () => {
    navigate("/signUp");
  };
  return (
    <div className="main_Container">
      <div className="signIn_Container">
        <div className="heading">
          <h1 className="signIn">Sign In</h1>
        </div>
        <div className="createAccount">
          <span className="link_Container">
            New User?{" "}
            <span onClick={handleSignUpLinkClick} className="link">
              Create Account
            </span>
          </span>
        </div>

        <div className="form_Container">
          <form className="form" onSubmit={handleSubmit}>
            <span className="inputContainer">
              <input
                className="input1"
                placeholder="Username or email"
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
              {usernameValidationError && (
                <span className="error">{usernameValidationError}</span>
              )}
            </span>

            <span className="inputContainer">
              <input
                className="input1"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
              />

              <img
                className="img1"
                src={eye}
                onClick={togglePassword}
                alt="eye"
              />
            </span>
            {passwordValidationError && (
              <span className="error_1">{passwordValidationError}</span>
            )}
          </form>
        </div>
        <ToastContainer></ToastContainer>
        <div className="checkbox_Container">
          <div className="checkbox_Contain">
            <input
              className="checkBox"
              type="checkbox"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            />
            <span className="checkBox_text">Keep me signed in</span>
          </div>
        </div>
        <div className="btn_Container">
          <button className="Btn" onClick={handleSubmit}>
            Sign In
          </button>
        </div>

        <div className="line_Container">
          <div className="or_Container">
            <span className="line" />
            <p className="refer_text">Or Sign In With</p>
            <span className="line_1" />
          </div>
        </div>
        <div className="social_Container">
          <div className="social_link">
            <img src={google} alt="Google" key="google" />
            <img src={facebook} alt="Facebook" key="facebook" />
            <img src={linkedin} alt="LinkedIn" key="linkedin" />
            <img src={twitter} alt="Twitter" key="twitter" />
          </div>
        </div>
      </div>
      <div className="img_Container">
        <img className="front_img" src={front} alt="Front" />
      </div>
    </div>
  );
};

export default SignIn;
