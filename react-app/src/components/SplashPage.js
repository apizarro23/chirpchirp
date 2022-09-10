import LoginForm from "./auth/LoginForm"
import SignUpForm from "./auth/SignUpForm"
import twitterLogo from "./images/twitter_logo.svg"
import backsplash from "./images/twitter_splash.png"
import { demoLogin } from "../store/session"
import { useDispatch } from "react-redux"
import "./SplashPage.css"


const SplashPage = () => {
  const dispatch = useDispatch()

    return (
        <div className="splashpage-container">
          <div className="left-container">
            <img alt="backsplash" className="left-backsplash" src={backsplash} />
          </div>
          <div className="right-container">
            <div className="top-right-container">
              <div className="bird-logo">
                <img alt="logo" className="logo" src={twitterLogo} />
              </div>
              <div className="happening-now">
                <h1>Welcome to chirpchirp</h1>
              </div>
            </div>
            <div className="signup-container">
              <h2>Join chirpchirp today.</h2>
              <div className="signup-form">
                <SignUpForm />
              </div>
            </div>
            <div className="login-container">
              <h2>Already have an account?</h2>
              <div className="login-form">
                <LoginForm />
              </div>
              <div className="demo-button-container">
                  <h2>Use the Demo</h2>
                  <button
                  className="demo-login-btn"
                  type="button"
                  onClick={() => {
                    dispatch(demoLogin());
                  }}
                  >
                  Demo Login
                  </button>
                </div>
            </div>
          </div>
        </div>
      );
    };
    export default SplashPage;