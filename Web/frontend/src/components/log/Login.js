import "./Log.css";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
const Login = () => {
  return (
    <div className="layout">
      <div className="login">
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
              <a href="/"> Forget Your Password?</a>
            </div>
          </p>
          <input type="submit" value="SIGN IN" />
          <p>
            Need Account?<a href="/"> SIGN UP</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
