import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get('success');
    const orderId = params.get('orderId');

    // call APIs to verify payment
    const verifyPayment = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/order/verify`, {
          success,
          orderId,
        });

        if (response.data.success) {
          navigate('/myorders');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    };

    if (success && orderId) {
      verifyPayment();
    }
  }, [location.search, navigate]);

  return <div>Verifying your payment...</div>;
};

export default Verify;

