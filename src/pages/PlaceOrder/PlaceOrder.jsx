/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import './PleaceOrderStyle.css';
import { StoreContext } from '../../context/StoreContext';
import { DELIVERY_FEE } from '../../constants/delivery-fee';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL);

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: Number(getTotalCartAmount() + DELIVERY_FEE.fifty_bath),
    };

    try {
      let response = await axios.post(url + '/api/order/place', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        socket.emit('newOrder', orderData);
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Order placement failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Order placement failed: " + error.message);
    }

  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert('Please log in to continue with the payment.');
      navigate('/cart');
    }
    else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input
            name='firstName'
            type="text"
            placeholder="First Name"
            required
            onChange={onChangeHandler}
            value={data.firstName}
          />

          <input
            name='lastName'
            type="text"
            placeholder="Last Name"
            required
            onChange={onChangeHandler}
            value={data.lastName}
          />
        </div>
        <input
          name='email'
          type="email"
          placeholder="Email Address"
          required
          onChange={onChangeHandler}
          value={data.email}
        />

        <input
          name='street'
          type="text"
          placeholder="Stress"
          required
          onChange={onChangeHandler}
          value={data.street}
        />
        <div className="multi-fields">
          <input
            name='city'
            type="text"
            placeholder="City"
            required
            onChange={onChangeHandler}
            value={data.city}
          />

          <input
            name='state'
            type="text"
            placeholder="State"
            required
            onChange={onChangeHandler}
            value={data.state}
          />
        </div>

        <div className="multi-fields">
          <input
            name='zipCode'
            type="text"
            placeholder="Zip code"
            required
            onChange={onChangeHandler}
            value={data.zipCode}
          />
          <input
            name='country'
            type="text"
            placeholder="Country"
            required
            onChange={onChangeHandler}
            value={data.country}
          />
        </div>

        <input
          name='phone'
          type="text"
          placeholder="Phone Number"
          required
          onChange={onChangeHandler}
          value={data.phone}
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>฿{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>฿{getTotalCartAmount() === 0 ? 0 : DELIVERY_FEE.fifty_bath}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>฿{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + DELIVERY_FEE.fifty_bath}</b>
            </div>
          </div>
          <button
            type='submit'
            className={getTotalCartAmount() > 0 ? "button-payment" : "button-disabled"}
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;