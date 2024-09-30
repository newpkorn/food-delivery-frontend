import { useContext } from 'react';
import './PleaceOrderStyle.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { DELIVERY_FEE } from '../../constants/delivery-fee';

const PlaceOrder = () => {

  const { getTotalCartAmount } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>
        <input type="email" placeholder="Email Address" required />
        <input type="text" placeholder="Stress" required />
        <div className="multi-fields">
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="State" required />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip code" required />
          <input type="text" placeholder="Country" required />
        </div>
        <input type="text" placeholder="Phone Number" required />
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
            className={getTotalCartAmount() > 0 ? "button-payment" : "button-disabled"}
            onClick={() => navigate('/payment')}>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;