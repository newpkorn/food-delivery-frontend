/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from 'react';
import './NavbarStyle.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { Link as ScrollLink } from 'react-scroll';
import { imageIcon } from '../../constants/image-icon';
import { FaCartArrowDown } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import ReactLoading from 'react-loading';
import UserGreeting from '../UserGreeting/UserGreeting';
import { LuUser } from 'react-icons/lu';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [loading, setLoading] = useState(true);
  const { getTotalCartAmount, getTotalItemsInCart, token, setToken, userObj } =
    useContext(StoreContext);

  const navbarMenu = ['Home', 'Menu', 'Mobile App', 'Contact Us'];

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    if (token && userObj && userObj.data && userObj.data.name) {
      console.log('User loged in :', userObj.data.name);
    } else {
      console.log('No user login');
    }
  }, [userObj]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
    setLoading(false);
  }, []);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={imageIcon.tomato_logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        {navbarMenu.map((item, index) => (
          <li key={index}>
            <ScrollLink
              to={item.toLocaleLowerCase()}
              smooth={true}
              duration={500}
              offset={-70}
              className={item === menu ? 'active' : ''}
              onClick={() => setMenu(item)}
            >
              {item}
            </ScrollLink>
          </li>
        ))}
      </ul>
      {/* Right side of the navbar */}
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <CiSearch />
        </div>
        <div
          className={
            getTotalCartAmount() === 0
              ? 'navbar-basket-icon'
              : 'navbar-basket-icon-active'
          }
        >
          <Link to="/cart">
            <FaCartArrowDown />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}>
            <p className="amount">
              {getTotalItemsInCart() === 0 ? '' : getTotalItemsInCart()}
            </p>
          </div>
        </div>
        {loading ? (
          <div className="loading-container">
            <ReactLoading
              type="spin"
              color="tomato"
              height={'20%'}
              width={'20%'}
            />
          </div>
        ) : !token ? (
          <button id="btn-signin" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className="navbar-Profile">
            <div className="user-icon">
              <UserGreeting user={userObj?.data?.name || 'Guest'} />
            </div>
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/user-profile')}>
                <LuUser className="profile" />
                <p>Profile</p>
              </li>
              <hr />
              <li onClick={() => navigate('/myorders')}>
                <img src={imageIcon.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={imageIcon.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
