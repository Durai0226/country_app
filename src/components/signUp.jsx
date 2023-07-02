import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eye from "../assets/Svg/eye.svg";
import facebook from "../assets/Svg/facebook.svg";
import google from "../assets/Svg/google.svg";
import linkedin from "../assets/Svg/linkedin.svg";
import twitter from "../assets/Svg/twitter.svg";
import front from "../assets/Svg/illustration.svg";
import "../styles/signIn.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsername,
  setEmail,
  setPassword,
  clearAuthData,
} from "../Redux/store";

const SignUp = () => {
  const username = useSelector((state) => state.auth.username);
  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (focusedField) {
      document.getElementById(focusedField).focus();
    }
  }, [focusedField]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (e) => {
    dispatch(setUsername(e.target.value));
    setUsernameError("");
  };

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
    setPasswordError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      setUsernameError("Please enter a username.");
      setFocusedField("usernameInput");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "") {
      setEmailError("Please enter an email address.");
      setFocusedField("emailInput");
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      setFocusedField("emailInput");
      return;
    }
    if (password.trim().length < 6) {
      setPasswordError("Password must be at least 6 characters");
      setFocusedField("passwordInput");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    toast.success("Sign up is successful!");
    setTimeout(() => {
      navigate("/signin");
    }, 2000);

    dispatch(clearAuthData());
  };
  const handleSignInLinkClick = () => {
    navigate("/signin");
  };
  return (
    <div className="main_Container">
      <div className="signIn_Container">
        <div className="heading">
          <h1 className="signIn">Sign Up</h1>
        </div>
        <div className="createAccount">
          <span className="link_Container">
            User have a Account{" "}
            <span onClick={handleSignInLinkClick} className="link">
              SignIn
            </span>
          </span>
        </div>

        <div className="form_Container">
          <form className="form" onSubmit={handleSubmit}>
            <span className="inputContainer">
              <input
                id="usernameInput"
                className="input1"
                placeholder="Username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
              ></input>
              {usernameError && <p className="error">{usernameError}</p>}
            </span>
            <span className="inputContainer">
              <input
                id="emailInput"
                className="input1"
                placeholder="Email"
                type="text"
                value={email}
                onChange={handleEmailChange}
              ></input>
              {emailError && <p className="error">{emailError}</p>}
            </span>
            <span className="inputContainer">
              <input
                id="passwordInput"
                className="input1"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
              ></input>
              {passwordError && <p className="error">{passwordError}</p>}
              <img
                className="img1"
                src={eye}
                onClick={togglePassword}
                alt="eye"
              />
            </span>
            <ToastContainer></ToastContainer>
            <div className="btn_Container">
              <button className="signUp_Btn" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className="line_Container">
          <div className="or_Container">
            <span className="line"></span>
            <p className="refer_text">Or Sign In With</p>
            <span className="line_1"></span>
          </div>
        </div>
        <div className="social_Container">
          <div className="social_link">
            <img src={google} alt="Google"></img>
            <img src={facebook} alt="Facebook"></img>
            <img src={linkedin} alt="LinkedIn"></img>
            <img src={twitter} alt="Twitter"></img>
          </div>
        </div>
      </div>
      <div className="img_Container">
        <img className="front_img" src={front} alt="Illustration"></img>
      </div>
    </div>
  );
};

export default SignUp;
