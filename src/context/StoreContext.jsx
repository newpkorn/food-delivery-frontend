/* eslint-disable no-const-assign */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const url = import.meta.env.VITE_API_URL;

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [userObj, setUserObj] = useState({});


  const getMe = async (token) => {
    try {
      const response = await axios.get(url + "/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserObj(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await axios.post(
          url + '/api/cart/add',
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } catch (error) {
        console.error('Error adding to cart:', error.response ? error.response.data : error.message);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      try {
        await axios.post(
          url + '/api/cart/remove',
          { itemId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } catch (error) {
        console.error('Error adding to cart:', error.response ? error.response.data : error.message);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };


  const getTotalItemsInCart = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalAmount += cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + '/api/food/list/');
      setFoodList(response.data.data);
    } catch (error) {
      console.error('Error fetching food list:', error);
    }
  };

  const fetchCartItems = async (token) => {
    try {
      const response = await axios.post(url + '/api/cart/get', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('API response', response.data);
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        console.warn('Failed to fetch cart items');
        setCartItems({}); // set basket to empty if not success
      }
    } catch (error) {
      console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
    }
  };


  useEffect(() => {
    async function fetchData() {
      await fetchFoodList();

      const savedCartItems = localStorage.getItem('cartItems');

      if (savedCartItems) {
        try {
          setCartItems(savedCartItems);
        } catch (error) {
          console.error("Error parsing savedCartItems:", error);
          setCartItems({}); // set to empty obj if parsing not success
        }
      } else {
        // if no savedCartItems, set to empty obj
        setCartItems({});
      }

      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
        await fetchCartItems(token);
        await getMe(token);
      }
    }

    fetchData();
  }, []);


  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalItemsInCart,
    url,
    token,
    setToken,
    userObj,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );

};


export default StoreContextProvider;