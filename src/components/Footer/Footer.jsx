import { CONTACT, COPYRIGHT, SOCIAL } from '../../constants/contact';
import { imageIcon } from '../../constants/image-icon';

import './FooterStyle.css';

const Footer = () => {
  return (
    <div className='footer' id='contact us'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={imageIcon.logo} alt="" />
          <p>{CONTACT.detail}</p>
          <div className="footer-social-icon">
            {SOCIAL.map((social) => (
              <a key={social.id} href={social.link} rel="noopener noreferrer">
                <img src={social.icon} alt="" />
              </a>
            ))}
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
            <li>{CONTACT.phone}</li>
            <li>{CONTACT.email}</li>
            <li>{CONTACT.address}</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        &copy; {COPYRIGHT}
      </p>
    </div>
  );
};

export default Footer;