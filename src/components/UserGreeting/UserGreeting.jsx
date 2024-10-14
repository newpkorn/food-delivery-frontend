/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './UserGreeting.Style.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { FaUserCircle } from 'react-icons/fa'; // ไอคอนรูปคน

const UserGreeting = ({ user }) => {

  const { url, token, userObj } = useContext(StoreContext);
  return (
    <div className="user-login">
      {userObj?.data?.image ? <img src={`${url}/images/users/` + userObj.data._id + '/' + userObj.data.image} className='user-profile' /> :
        <FaUserCircle className='user-icon' size={40} />}
      <span className='user-name'>Hi, {user} !</span>
    </div>
  );
};

export default UserGreeting;