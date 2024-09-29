/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './FoodItemStyle.css';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import { imageIcon } from '../../constants/image-icon';

const FoodItem = ({ id, name, price, description, image }) => {

  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-image-container">
        <img className='food-item-image' src={image} alt="" />
        {
          !cartItems[id]
            ? <img
              className='add'
              src={imageIcon.add_icon_white}
              alt=""
              onClick={() => addToCart(id)}
            />
            : <div className="food-item-counter">
              <img
                className='minus'
                src={imageIcon.remove_icon_red}
                alt=""
                onClick={() => removeFromCart(id)}
              />
              <p>{cartItems[id]}</p>
              <img
                className='plus'
                src={imageIcon.add_icon_green}
                alt=""
                onClick={() => addToCart(id)} />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={imageIcon.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">฿{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;