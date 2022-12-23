import "./Log.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { BsBoxArrowInUp } from "react-icons/bs";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        firstName,
        lastName,
        password,
        email,
        phone,
        address,
      })
    );
  }, [firstName, password, lastName, email, address, phone]);
  useEffect(() => {
    const userData2 = JSON.parse(localStorage.getItem("userData"));
    if (userData2) {
      setAddress(userData2.address);
      setEmail(userData2.email);
      setFirstName(userData2.f_name);
      setLastName(userData2.l_name);
      setPhone(userData2.phone);
      setPassword(userData2.password);
    }
  }, []);
  const handelSubmit = async (e) => {
    if (e !== undefined) e.preventDefault();
    const userdata = {
      firstName,
      lastName,
      password,
      phone,
      address,
      email,
    };
    const pass_pattern = /^(?=.*\d)(?=.*[!@$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const email_pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const Name_pattern = /^[a-z ,.'-]+$/i;

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
        "Your password must be greater than 8 characters including numbers and alphabets(small and capital letters) and special characters('#' is forbidden)"
      );
      return;
    }

    if (!email_pattern.test(email)) {
      alert("Please, Enter a valid Email");
      return;
    }
    console.log(firstName, lastName);
    if (!Name_pattern.test(firstName) || !Name_pattern.test(lastName)) {
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
    } else if (password.toString().includes("#")) {
      alert("# is forbidden in password");
      return;
    }

    try {
      const res = await fetch(`http://localhost:1444/api/v1/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      });

      if ((await res.json()) === "email_signed_before") {
        document
          .getElementById("emailSignedBeforeMess")
          .classList.add("active");
        setTimeout(() => {
          document
            .getElementById("emailSignedBeforeMess")
            .classList.remove("active");
        }, 3000);
        console.log(4444);
        return;
      } else {
        navigate("/Signin");
        console.log(555);
      }
      console.log(userdata);
    } catch (error) {
      console.log(error);
    }
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
            // value={firstName}
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
            // value={lastName}
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
            // value={email}
            required
            type="email"
            name="Email"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div id="emailSignedBeforeMess">this email signed before</div>
          <label htmlFor="phone">
            <p> Phone</p>
          </label>
          <input
            required
            // value={phone}
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
            // value={address}
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
            // value={password}
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
            // value={confirmedPassword}
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
