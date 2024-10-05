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
  }, [hasVerified]);

  return (
    <div>
      <div className="verify">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Verify;
