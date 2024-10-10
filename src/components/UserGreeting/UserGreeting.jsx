/* eslint-disable react/prop-types */
import './UserGreeting.Style.css';

import { FaUserCircle } from 'react-icons/fa'; // ไอคอนรูปคน

const UserGreeting = ({ user }) => {
  return (
    <div className="user-login">
      <FaUserCircle className='user-icon' size={40} />
      <span className='user-name'>Hi, {user}!</span>
    </div>
  );
};

export default UserGreeting;