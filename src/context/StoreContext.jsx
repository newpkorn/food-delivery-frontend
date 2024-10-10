/* eslint-disable no-const-assign */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [userObj, setUserObj] = useState({});

  // const getMe = async (token) => {
  //   try {
  //     const response = await axios.get(url + "/api/user/me", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setUserObj(response.data);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  const getMe = async (token) => {
    try {
      const response = await axios.get(url + "/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserObj(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401 && error.response.data.message === "Token expired") {
        localStorage.removeItem("token");
        setToken("");
        navigate('/');
      } else {
        console.error("Error fetching user data:", error);
      }
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

  // const getTotalItemsInCart = () => {
  //   let totalAmount = 0;
  //   // console.log("Cart Items:", cartItems); // ตรวจสอบ cartItems
  //   if (cartItems && Object.keys(cartItems).length > 0) {
  //     for (const item in cartItems) {
  //       console.log(`Item: ${item}, Quantity: ${cartItems[item].quantity}`); // ตรวจสอบแต่ละไอเทม
  //       if (cartItems[item] && cartItems[item].quantity > 0) {
  //         totalAmount += cartItems[item].quantity;
  //       }
  //     }
  //   }
  //   // console.log("Total Amount Before Return:", totalAmount); // ตรวจสอบ totalAmount
  //   return totalAmount;
  // };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + '/api/food/list/');
      setFoodList(response.data.data);
    } catch (error) {
      console.error('Error fetching food list:', error);
    }
  };

  // const fetchCartItems = async (token) => {
  //   try {
  //     const response = await axios.post(url + '/api/cart/get', {}, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });

  //     if (response.data.success) {
  //       setCartItems(response.data.cartData);
  //     } else {
  //       console.warn('Failed to fetch cart items');
  //       setCartItems({}); // set basket to empty if not success
  //     }
  //   } catch (error) {
  //     console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
  //   }
  // };

  const fetchCartItems = async (token) => {
    try {
      const response = await axios.post(url + '/api/cart/get', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        console.warn('Failed to fetch cart items');
        setCartItems({}); // set basket to empty if not success
      }
    } catch (error) {
      if (error.response && error.response.status === 401 && error.response.data.message === "Token expired") {
        localStorage.removeItem("token");
        setToken("");
        navigate('/');
      } else {
        console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
      }
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
        await fetchCartItems(token);
      }
    }

    fetchData();
  }, []);

  // const fetchCartItems = async (token) => {
  //   try {
  //     const response = await axios.post(url + '/api/cart/get', {}, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.data.success) {
  //       const cartData = response.data.cartData;
  //       setCartItems(cartData);
  //       localStorage.setItem('cartItems', JSON.stringify(cartData)); // อัปเดต localStorage ด้วย cartData จาก backend
  //     } else {
  //       console.warn('Failed to fetch cart items');
  //       setCartItems({});
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 401 && error.response.data.message === "Token expired") {
  //       localStorage.removeItem("token");
  //       setToken("");
  //       navigate('/');
  //     } else {
  //       console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   async function fetchData() {
  //     await fetchFoodList();

  //     // ดึงข้อมูลจาก localStorage และแปลงกลับเป็น object
  //     const savedCartItems = localStorage.getItem('cartItems');
  //     if (savedCartItems) {
  //       try {
  //         setCartItems(JSON.parse(savedCartItems));
  //       } catch (error) {
  //         console.error("Error parsing savedCartItems:", error);
  //         setCartItems({}); // ถ้าแปลงไม่สำเร็จ ให้ตั้งเป็น empty obj
  //       }
  //     } else {
  //       setCartItems({});
  //     }

  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       setToken(token);
  //       await fetchCartItems(token); // ดึงข้อมูลจาก backend ถ้ามี token
  //       await getMe(token);
  //     }
  //   }

  //   fetchData();
  // }, []);

  // เพิ่ม useEffect เพื่อตรวจสอบเมื่อ cartItems ถูกอัปเดต
  // useEffect(() => {
  //   console.log('Backed host: ', import.meta.env.VITE_API_URL);
  //   if (cartItems && Object.keys(cartItems).length > 0) {
  //     console.log("Cart items updated:", cartItems);
  //   }
  // }, [cartItems]);


  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalItemsInCart,
    fetchCartItems,
    url,
    token,
    setToken,
    getMe,
    userObj,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );

};


export default StoreContextProvider;