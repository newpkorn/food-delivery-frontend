/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import './MyOrdersStyle.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { imageIcon } from '../../constants/image-icon';
import ReactLoading from 'react-loading';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + '/api/order/userorders', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const trackingOrder = async (orderId) => {
    console.log("Tracking Order ID:", orderId); // debuging orderId
    const response = await axios.get(url + '/api/order/trackorder/' + orderId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data.data.status);

    // Update the status of the order that is currently being tracked.
    setOrderStatuses((prevStatuses) => ({
      ...prevStatuses,
      [orderId]: response.data.data.status
    }));
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {loading ? (
          <div className="loading-container">
            <ReactLoading type="spin" color="tomato" height={'20%'} width={'20%'} />
          </div>
        ) : (
          data.length > 0 ? (
            data.map((order) => {
              //  define orderStatuses for checking the current status
              const currentStatus = orderStatuses[order._id] || order.status;

              return (
                <div key={order._id} className="my-orders-order">
                  <p>
                    <img className='img-status' src={
                      currentStatus === "Delivered" ? imageIcon.delivered
                        : currentStatus === "Out for delivery" ? imageIcon.out_for_delivery
                          : imageIcon.food_process
                    } alt="Order Status" />
                  </p>
                  <p>
                    {order.items.map((item, index) => (
                      index === order.items.length - 1
                        ? item.name + " x " + item.quantity
                        : item.name + " x " + item.quantity + ", "
                    ))}
                  </p>

                  <p>
                    ฿{order.amount}.00
                  </p>

                  <p>
                    Items: {order.items.length}
                  </p>

                  <p>
                    <span className={
                      currentStatus === "Delivered"
                        ? 'status-completed'
                        : currentStatus === "Out for delivery"
                          ? 'status-out-for-delivery'
                          : 'status-processing'
                    }>&#x25cf; </span>
                    <b>{currentStatus}</b>
                  </p>

                  <button onClick={() => trackingOrder(order._id)}>Track Order</button>
                </div>
              );
            })
          ) : (
            <p>No order found!!</p>
          )
        )}
      </div>
    </div>
  );
};

export default MyOrders;