import "./Log.css";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import * as React from "react";
import { BiLogIn } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userEmail, setuserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(0);
  const navigate = useNavigate();
  // const [userSsn, setUserSsn] = useState(0);
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(55);
      console.log(password);

      const dataRes = await fetch(
        `http://localhost:1444/api/v1/check_GetDataUser?email=${userEmail}&password=${password}`
      );

      
      const { data,status } = await dataRes.json();
      console.log(data,status);
      if (status === true) {
        navigate(`/`, {
          state: {
            ssn: data.ssn,
            f_name: data.f_name,
            l_name: data.l_name,
            email: userEmail,
            address: data.address,
          },
        });
      } else {
        document.querySelector(".messErrorReg").classList.add("active");
        setTimeout(() => {
          document.querySelector(".messErrorReg").classList.remove("active");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="Loglayout">
        <div className="log-box ">
          <h3>Sign in</h3>
          <form
            className="formlogin"
            autoComplete="off"
            onSubmit={handelSubmit}
          >
            <label htmlFor="Uname">
              <p>Email</p>
            </label>
            <input
              type="text"
              value={userEmail}
              name="Uname"
              placeholder="Enter Username"
              onChange={(e) => {
                setuserEmail(e.target.value);
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
            <div style={{ color: "red" }} className="messErrorReg">
              You need to sign up first
            </div>
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
              style={{ backgroundColor: "darkslategray" }}
              className="btn2"
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
