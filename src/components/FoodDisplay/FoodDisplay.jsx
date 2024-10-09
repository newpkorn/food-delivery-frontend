/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import './FoodDisplayStyle.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import ReactLoading from 'react-loading';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const isLoading = !Array.isArray(food_list) || food_list.length === 0;

  return (
    <div className='food-display' id='food-display'>
      {isLoading ? (
        <div className="loading-container">
          <ReactLoading type="spin" color="tomato" height={'20%'} width={'20%'} />
        </div>
      ) : (
        <>
          <h2>Top dishes near you</h2>
          <div className="food-display-list">
            {food_list.map((item, index) => {
              if (category === "All" || category === item.category) {
                return (
                  <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                );
              }
              return null;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default FoodDisplay;
