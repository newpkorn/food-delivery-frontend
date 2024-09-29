/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { assets } from '../../assets/assets';
import './FoodItemStyle.css';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';

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
              src={assets.add_icon_white}
              alt=""
              onClick={() => addToCart(id)}
            />
            : <div className="food-item-counter">
              <img
                className='minus'
                src={assets.remove_icon_red}
                alt=""
                onClick={() => removeFromCart(id)}
              />
              <p>{cartItems[id]}</p>
              <img
                className='plus'
                src={assets.add_icon_green}
                alt=""
                onClick={() => addToCart(id)} />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;