/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import './NavbarStyle.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { Link as ScrollLink } from 'react-scroll';
import { imageIcon } from '../../constants/image-icon';
import { FaCartArrowDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, getTotalItemsInCart } = useContext(StoreContext);

  const navbarMenu = ["Home", "Menu", "Mobile App", "Contact Us"];

  return (
    <div className='navbar'>
      <Link to="/">
        <img src={imageIcon.tomato_logo_1} alt="" className="logo" />
      </Link>
      <ul className='navbar-menu'>
        {navbarMenu.map((item, index) => (
          <li key={index}>
            <ScrollLink
              to={item.toLocaleLowerCase()}
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
        <div className='navbar-search-icon'>
          <CiSearch />
        </div>
        <div className={getTotalCartAmount() === 0 ? "navbar-basket-icon" : "navbar-basket-icon-acive"}>
          <Link to="/cart">
            <FaCartArrowDown />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}>
            <p className='amount'>{getTotalItemsInCart() === 0 ? "" : getTotalItemsInCart()}</p>
          </div>
        </div>
        <button onClick={() => setShowLogin(true)}>sign in</button>
      </div >
    </div >
  );
};

export default Navbar;