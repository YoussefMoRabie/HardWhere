import "./Log.css";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import * as React from "react";
import { BiLogIn } from "react-icons/bi";
import { useState } from "react";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="Loglayout">
        <div className="log-box ">
          <h3>Sign in</h3>
          <form className="formlogin" noValidate autoComplete="off">
            <label htmlFor="Uname">
              <p>Username</p>
            </label>
            <input
              type="text"
              value={userName}
              name="Uname"
              placeholder="Enter Username"
              onChange={(e) => {
                setuserName(e.target.value);
              }}
            />
            <label htmlFor="psw">
              <p>Password</p>
            </label>
            <input
              value={password}
              type="password"
              name="psw"
              placeholder="Enter Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <p>
              <div className="social">
                <p>OR</p>

                <BsFacebook color="blue" size="2em" style={{ margin: "5px" }} />
                <AiFillTwitterCircle
                  color="#00acee"
                  size="2em"
                  style={{ margin: "5px" }}
                />
                <SiGmail
                  clipPath="#ac4040"
                  size="2em"
                  style={{ margin: "5px" }}
                />
              </div>
              <div className="forget">
                <Link to="/" className="link">
                  Forget Your Password?
                </Link>
              </div>
            </p>
            <Button
              className="btn"
              endIcon={<BiLogIn></BiLogIn>}
              variant="contained"
              type="submit"
              onclick={() => {
                console.log("i am clicked");
              }}
            >
              SIGN IN
            </Button>
            <p>
              Need Account?{" "}
              <Link to="/Signup" className="link">
                {" "}
                SIGN UP
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
