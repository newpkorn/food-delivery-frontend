import { assets } from '../../assets/assets';
import './FooterStyle.css';

const Footer = () => {
  return (
    <div className='footer' id='contact us'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore nobis aspernatur obcaecati pariatur labore eaque at consectetur laborum, dolor eveniet. A nobis quam illum ut quibusdam. Provident vero impedit recusandae deserunt, dolor omnis fugit!</p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-213-456-7890</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()}. Made with ReactJs by newpk. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;