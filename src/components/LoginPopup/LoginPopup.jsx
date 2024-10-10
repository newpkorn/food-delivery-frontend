/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import './LoginPopupStyle.css';
import { imageIcon } from '../../constants/image-icon';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MdError } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, getMe, fetchCartItems } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [alert, setAlert] = useState({ type: '', message: '' });

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    console.log("Login form submitted"); // Log การส่งฟอร์ม
    let newUrl = url;

    let dataToSend;
    if (currState === 'Login') {
      dataToSend = {
        email: data.email,
        password: data.password
      };
      newUrl += '/api/user/login';
    } else {
      dataToSend = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      };
      newUrl += '/api/user/register';
    }

    try {
      const response = await axios.post(newUrl, dataToSend);

      setAlert({
        type: response.data.success ? 'success' : 'error',
        message: response.data.message
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);

        getMe(response.data.token);
        fetchCartItems(response.data.token);

        setShowLogin(false);
        navigate('/');
      } else {
        console.log("FAIL!!", response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setAlert({
        type: 'error',
        message: error.response.data.message || "An error occurred"
      });
    }
  };


  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        {alert.message &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`alert-container alert-${alert.type}`}
          >
            <MdError className='icon' />
            {alert.message}
          </motion.div>}
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={imageIcon.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login"
            ? <>
              <input
                type="email"
                name='email'
                placeholder='Your Email'
                required
                onChange={onChangeHandler}
                value={data.email}
              />
              <input
                type="password"
                name='password'
                placeholder='Your Password'
                required
                onChange={onChangeHandler}
                value={data.password}
              />
            </>
            : <>
              <input
                type="text"
                name='name'
                placeholder='Your Name'
                required
                onChange={onChangeHandler}
                value={data.name}
              />
              <input
                type="email"
                name='email'
                placeholder='Your Email'
                required
                onChange={onChangeHandler}
                value={data.email}
              />
              <input
                type="password"
                name='password'
                placeholder='Your Password'
                required
                onChange={onChangeHandler}
                value={data.password}
              />
              <input
                type="password"
                name='confirmPassword'
                placeholder='Confirm Your Password'
                required
                onChange={onChangeHandler}
                value={data.confirmPassword}
              />
            </>}
        </div>
        <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  );
};

export default LoginPopup;
