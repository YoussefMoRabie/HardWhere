import * as React from'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useLocation } from 'react-router-dom';
import './footStyle.css'
import { makeStyles } from '@mui/styles';


const Footer = (props) => {
  const date = new Date();
  const { state } = useLocation();

  const iscust = () => { return state == null || state.auth === 'customer' }
  const isemp = () => { return state != null && state.auth !== 'customer' }
  return (
    
      <>
      {iscust() &&
    <div className="footer">
      <div className="head">
        <div className="Laptop category">
          <h3>Mahmoud Sobhy</h3>
          <img src="./Sobhy.jpeg" alt="Sobhy" />
        </div>
        <div className="Mobile category">
          <h3 style={{textAlign:'center'}}>Youssef Haggag</h3>
              <img src="./haggag.jpeg" alt="Haggag" />
        </div>
        <div className="Headphone category">
          <h3>Mahmoud Yehia</h3>
              <img src="./Yehia.jpeg" alt="Yehia" />
        </div>
        <div className="screens category">
          <h3>Youssef Rabia</h3>
              <img src="./Rabia.jpeg" alt="Rabia" />
        </div>
        
        <div className="contact">
          <h4 style={{ textAlign: 'center', padding: '10px', alignSelf: "flex-end" }}>Contact us</h4>
          <ul>
            <li><Link to=""><FacebookIcon sx={{"&:hover":{color: "#1976d2"}}}  color='action' fontSize='large'></FacebookIcon></Link></li>
            <li><Link to=""><TwitterIcon sx={{ "&:hover": { color: "#1976d2" } }} color='action' fontSize='large'></TwitterIcon></Link></li>
            <li><Link to=""><InstagramIcon sx={{ "&:hover": { color: "#1976d2" } }} color='action' fontSize='large'></InstagramIcon></Link></li>
            <li><Link to=""><GoogleIcon sx={{ "&:hover": { color: "#1976d2" } }} color='action' fontSize='large'></GoogleIcon></Link></li>
          </ul>
        </div>
      </div>
      <div className="tail">
        <p>Copyright &copy;{date.getFullYear()} | All rights preserved by HardWhere developers </p>
        <ul className='terms'>
          <li><Link to="/">Terms</Link> </li>
          <li><Link to="/">Privacy</Link> </li>
          <li><Link to="/">Compliances</Link> </li>
        </ul>
      </div>
    </div>
}</>  
  );
}

export default Footer;