import "./Log.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { BsBoxArrowInUp } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("Mahmoud");
  const [lastName, setLastName] = useState("Yahia");
  const [password, setPassword] = useState(0);
  const [confirmedPassword, setconfirmedPassword] = useState(0);
  const [email, setEmail] = useState("myehia162@gmail.com");
  const [phone, setPhone] = useState("01555952221");
  const [address, setAddress] = useState("555ggg555");
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    const userdata = {
      f_name: firstName,
      l_name: lastName,
      password,
      phone,
      address,
      email,
    };
    const pass_pattern =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const email_pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const Name_pattern = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm;

    if (firstName === "") {
      alert("Enter your first name");
      return;
    }
    if (lastName === "") {
      alert("Enter your last name");
      return;
    }
    if (phone === "") {
      alert("Enter your phone number");
      return;
    }
    if (address === "") {
      alert("Enter your address");
      return;
    }
    if (email === "") {
      alert("Enter your email");
      return;
    }
    if (!pass_pattern.test(password)) {
      alert(
        "Your password must be greater than 8 characters including numbers and alphabets(small and capital letters) and special characters"
      );
      return;
    }
    if (!email_pattern.test(email)) {
      alert("Please, Enter a valid Email");
      return;
    }
    if (!(Name_pattern.test(firstName) || Name_pattern.test(lastName))) {
      alert("Please, Enter a valid name");
      return;
    }
    if (!/01[0-9]{8}/.test(phone)) {
      alert("Enter a valid phone nmber");
      return;
    }
    if (password !== confirmedPassword) {
      alert("the two entered passwords don't match, reconfirm password.");
      return;
    }
    try {
      fetch(`http://localhost:1444/api/v1/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      });
      navigate("/Signin");
    } catch (error) {
      console.log(error);
    }

    console.log(userdata);
  };

  return (
    <div className="Loglayout">
      <div className="log-box ">
        <h3>Sign Up</h3>
        <p>Please fill in this form to create an account! </p>
        <form
          className="formlogin"
          action=""
          onSubmit={handelSubmit}
          autoComplete="off"
        >
          <label htmlFor="fname">
            <p> FirstName</p>
          </label>
          <input
            value={firstName}
            required
            type="text"
            name="Fname"
            placeholder="Enter Your First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <label htmlFor="Lname">
            <p> LastName</p>
          </label>
          <input
            value={lastName}
            required
            type="text"
            name="Lname"
            placeholder="Enter Your Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <label htmlFor="Email">
            <p> Email</p>
          </label>
          <input
            value={email}
            required
            type="email"
            name="Email"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="phone">
            <p> Phone</p>
          </label>
          <input
            required
            value={phone}
            type="text"
            name="phone"
            placeholder="Enter Your Phone Number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <label htmlFor="addr">
            <p> Address</p>
          </label>
          <input
            value={address}
            required
            type="text"
            name="addr"
            placeholder="Enter Your Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <label htmlFor="Psw">
            <p>Password</p>
          </label>
          <input
            value={password}
            required
            type="password"
            name="Psw"
            placeholder=" Enter a Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label htmlFor="Confirm_P">
            <p> Confirm Password</p>
          </label>
          <input
            value={confirmedPassword}
            required
            type="password"
            name="Confirm_P"
            placeholder="Confirm Your Password"
            onChange={(e) => {
              setconfirmedPassword(e.target.value);
            }}
          />

          <input
            type="checkbox"
            name="checkbox"
            className="checkbox"
            required
          />
          <label htmlFor="checkbox">
            I accept all the
            <Link to="/Signup" className="link">
              {" "}
              Terms{" "}
            </Link>
            and{" "}
            <Link to="/Signup" className="link">
              {" "}
              Privacy Policy.
            </Link>
          </label>
          <Button
            style={{ backgroundColor: "darkslategray" }}
            className="btn2"
            type="submit"
            variant="contained"
            endIcon={<BsBoxArrowInUp />}
          >
            SIGN UP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
