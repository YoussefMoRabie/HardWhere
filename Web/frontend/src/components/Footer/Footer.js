import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import './footStyle.css'
import { makeStyles } from '@mui/styles';


const Footer = () => {
  const date = new Date();
  const laptopsBrands = [{ title: "Apple", path: "/" }, { title: "Dell", path: "/" }, { title: "Acer", path: "/" }, { title: "Lenovo", path: "/" }, { title: "Asus", path: "/" }]
  const mobileBrands = [{ title: "Iphone", path: "/" }, { title: "Samsung", path: "/" }, { title: "OnePlus", path: "/" }, { title: "Oppo", path: "/" }, { title: "Xioami", path: "/" }]
  const headphonesBrands = [{ title: "Sony", path: "/" }, { title: "JPL", path: "/" }, { title: "Apple", path: "/" }, { title: "Beats", path: "/" }, { title: "Razer", path: "/" }]
  const screenBrands = [{ title: "Samsung", path: "/" }, { title: "LG", path: "/" }, { title: "Toshiba", path: "/" }]
  const accessoryBrands = [{ title: "Apple", path: "/" }, { title: "Dell", path: "/" }, { title: "Acer", path: "/" }, { title: "Lenovo", path: "/" }, { title: "Asus", path: "/" }]
  return (
    <div className="footer">
      <div className="head">
        <div className="Laptop category">
          <h4>Laptops</h4>
          <ul>
            {laptopsBrands.map((laptop) => (<li>
              <Link to={laptop.path}>{laptop.title}</Link>
            </li>))}
          </ul>
        </div>
        <div className="Mobile category">
          <h4>Mobile</h4>
          <ul>
            {mobileBrands.map((mobile) => (<li>
              <Link to={mobile.path}>{mobile.title}</Link>
            </li>))}
          </ul>

        </div>
        <div className="Headphone category">
          <h4>Headphones</h4>
          <ul>
            {headphonesBrands.map((headphones) => (<li>
              <Link to={headphones.path}>{headphones.title}</Link>
            </li>))}
          </ul>

        </div>
        <div className="screens category">
          <h4>Screens</h4>
          <ul>
            {screenBrands.map((screen) => (<li>
              <Link to={screen.path}>{screen.title}</Link>
            </li>))}
          </ul>

        </div>
        <div className="Accessories category">
          <h4>Accessories</h4>
          <ul>
            {accessoryBrands.map((accessory) => (<li>
              <Link to={accessory.path}>{accessory.title}</Link>
            </li>))}
          </ul>
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
  );
}

export default Footer;