import "./Log.css";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="layout">
      <div className="log-box ">
        <h3>Sign in</h3>
        <form action="">
          <label htmlFor="Uname">
            <p> UserName</p>
          </label>
          <input type="text" name="Uname" placeholder="Enter Username" />

          <label htmlFor="psw">
            <p>Password</p>
          </label>
          <input type="password" name="psw" placeholder="Enter Password" />

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
          <input type="submit" value="SIGN IN" />
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
  );
};

export default Login;
