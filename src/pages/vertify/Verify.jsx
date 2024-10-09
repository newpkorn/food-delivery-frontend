/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from 'react-router-dom';
import './VerifyStyle.css';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [hasVerified, setHasVerified] = useState(false);

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + '/api/order/verify', {
        success,
        orderId,
      });

      if (response.data.success) {
        navigate('/myorders');
      } else {
        alert('Payment verification failed. Please try again.');
        navigate('/');
      }

      setHasVerified(true);
    } catch (error) {
      console.log(error);
      navigate('/');
    }
  };

  useEffect(() => {
    if (!hasVerified) {
      verifyPayment();
    }
  }, []);

  return (
    <div className="verify">
      {!hasVerified ? (
        <div>
          <div className="spinner"></div>
          <p>Verifying your payment...</p>
        </div>
      ) : (
        <p>Payment verified!</p>
      )}
    </div>
  );
};

export default Verify;
