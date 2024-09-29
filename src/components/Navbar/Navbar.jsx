/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { assets } from '../../assets/assets';
import './NavbarStyle.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);

  const navbarMenu = ["home", "menu", "mobile-app", "contact us"];
  return (
    <div className='navbar'>
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className='navbar-menu'>
        {navbarMenu.map((item, index) => (
          <li key={index}>
            <ScrollLink
              to={item}
              smooth={true}
              duration={500}
              offset={-70}
              className={item === menu ? "active" : ""}
              onClick={() => setMenu(item)}
            >
              {item}
            </ScrollLink>
          </li>
        ))}
      </ul>


      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className='navbar-search-icon'>
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>sign in</button>
      </div >
    </div >
  );
};

export default Navbar;