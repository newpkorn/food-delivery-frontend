/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import './CartStyle.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { LuDelete } from "react-icons/lu";
import { DELIVERY_FEE } from '../../constants/delivery-fee';

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);

  const navigate = useNavigate();

  const cartTitles = ["Items", "Title", "Price", "Quantiry", "Total", "Remove"];

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          {cartTitles.map((title, index) => (
            <p key={index}>{title}</p>
          ))}
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>฿{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>฿{item.price * cartItems[item._id]}</p>
                  <p
                    className='delete'
                    onClick={() => removeFromCart(item._id)}>
                    <LuDelete />
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
            className={getTotalCartAmount() > 0 ? 'button-checkout' : 'button-disabled'}
            onClick={() => navigate('/order')}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;