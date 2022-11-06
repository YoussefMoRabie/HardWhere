import "./Log.css";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="layout">
      <div className="log-box ">
        <h3>Sign Up</h3>
        <p>Please fill in this form to create an account! </p>
        <form action="">
          <label htmlFor="fname">
            <p> FirstName</p>
          </label>
          <input type="text" name="Fname" placeholder="Enter Your First Name" />
          <label htmlFor="Lname">
            <p> LastName</p>
          </label>
          <input type="text" name="Lname" placeholder="Enter Your Last Name" />
          <label htmlFor="Email">
            <p> Email</p>
          </label>
          <input type="email" name="Email" placeholder="Enter Your Email" />
          <label htmlFor="Psw">
            <p>Password</p>
          </label>
          <input type="password" name="Psw" placeholder=" Enter a Password" />
          <label htmlFor="Confirm_P">
            <p> Confirm Password</p>
          </label>
          <input
            type="password"
            name="Confirm_P"
            placeholder="Confirm Your Password"
          />
          <input type="checkbox" name="checkbox" className="checkbox" />
          <label htmlFor="checkbox">
            I accept all the
            <Link to="/Signup" className="link">
              Terms
            </Link>
            and
            <Link to="/Signup" className="link">
              Privacy Policy.
            </Link>
          </label>
          <input type="submit" value="SIGN UP" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
